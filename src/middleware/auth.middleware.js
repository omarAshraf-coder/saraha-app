import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    let token = req.headers.token || req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    }

    try {
        const decoded = jwt.verify(token, 'secretKey');
        req.user = decoded;
        next();
    } catch (error) {
        console.log("JWT ERROR DETAILS:", error.message);
        return res.status(400).json({ message: "Invalid token", error: error.message });
    }
};