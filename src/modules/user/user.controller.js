import { User } from './user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "Success", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    if (user.bannedUntil && user.bannedUntil > Date.now()) {
      const remainingMinutes = Math.ceil((user.bannedUntil - Date.now()) / (60 * 1000));
      return res.status(403).json({
        message: `Account is temporarily banned due to multiple failed login attempts. Try again after ${remainingMinutes} minute(s).`
      });
    }

    const matchPassword = bcrypt.compareSync(password, user.password);
    if (!matchPassword) {
      user.failedLoginAttempts += 1;
      
      if (user.failedLoginAttempts >= 5) {
        user.bannedUntil = new Date(Date.now() + 5 * 60 * 1000);
        user.failedLoginAttempts = 0;
        await user.save();
        return res.status(403).json({
          message: "Account has been banned for 5 minutes due to 5 consecutive failed login attempts."
        });
      }

      await user.save();
      return res.status(400).json({
        message: `Invalid email or password. Failed attempts: ${user.failedLoginAttempts}/5`
      });
    }

    user.failedLoginAttempts = 0;
    user.bannedUntil = null;

    if (user.isTwoStepVerificationEnabled) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.code = otp;
      await user.save();

      return res.status(200).json({
        message: "2-Step Verification required. OTP sent.",
        otpForTesting: otp
      });
    }

    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, 'secretKey');
    return res.status(200).json({ message: "Login success", token });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
};

export const enableTwoStepVerification = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isTwoStepVerificationEnabled = true;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.code = otp;
    await user.save();

    return res.status(200).json({
      message: "2-Step Verification enabled successfully. OTP sent.",
      otpForTesting: otp
    });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
};

export const loginConfirmation = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.code !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.code = null;
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, 'secretKey');
    return res.status(200).json({ message: "Login confirmed successfully", token });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.code = otp;
    await user.save();

    return res.status(200).json({ message: "OTP generated successfully", otp });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
};