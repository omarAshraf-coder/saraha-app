import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }
  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token", error });
  }
};