import User from "../models/users.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";

export const registerUserService = async (userData) => {
    try {
        const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
        if (existingUser) {
            throw new Error("Email already registered");
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        const newUser = new User({
            ...userData,
            password: hashedPassword,
        });

        await newUser.save();
        return newUser;
    } catch (error) {
        throw new Error("Error registering user: " + error.message);
    }
};

export const loginUserService = async (email, password) => {
    try {
        const emailLower = email.toLowerCase();
        const user = await User.findOne({ email: emailLower });
        if (!user) {
            throw new Error("User not found");
        }

        // 2. Compare hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error("Invalid password");
        }

        // 3. Generate JWT
        const token = generateToken({
            id: user._id,
            email: user.email,
            role: user.role,
        });

        // 4. Return safe user data
        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    } catch (error) {
        throw new Error("Error logging in: " + error.message);
    }
};


export const logUserOutService = async () => {
    return true;
};

export const getUserByIdService = async (userId) => {
    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        throw new Error("Error fetching user: " + error.message);
    }
};


export const updateUserService = async (userId, updateData) => {
    try {
        if (updateData.password) {
            const saltRounds = 10;
            updateData.password = await bcrypt.hash(updateData.password, saltRounds);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return updatedUser;
    } catch (error) {
        throw new Error("Error updating user: " + error.message);
    }
};

export const deleteUserService = async (userId) => {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error("User not found");
        }
        return deletedUser;
    } catch (error) {
        throw new Error("Error deleting user: " + error.message);
    }
};
