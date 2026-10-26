import { User } from './user.model.js';

export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const newUser = new User({
      userName,
      email,
      password
    });

    await newUser.save();

    res.status(201).json({ message: "Done signup successfully!", newUser });
  } catch (error) {
    res.status(500).json({ message: "Catch error", error: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found!" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    res.status(200).json({ message: "Done login successfully!", user });
  } catch (error) {
    res.status(500).json({ message: "Catch error", error: error.message });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

    res.status(200).json({ 
      message: "OTP generated successfully!", 
      email, 
      otp 
    });
  } catch (error) {
    res.status(500).json({ message: "Error generating OTP", error: error.message });
  }
};