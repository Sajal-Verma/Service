import {
    registerUserService,
    loginUserService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
} from "../services/userService.js";


export const registerUser = async (req, res) => {
    try {
        await registerUserService(req.body);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const { token, user } = await loginUserService(email, password);

        res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            })
            .json({
                message: "Login successful",
                user,
            });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};


export const logUserOut = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const getUserById = async (req, res) => {
    try {
        const user = await getUserByIdService(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


export const updateUser = async (req, res) => {
    try {
        const updatedUser = await updateUserService(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const deleteUser = async (req, res) => {
    try {
        await deleteUserService(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
