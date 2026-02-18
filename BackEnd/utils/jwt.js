import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

export const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '10m' });
}
