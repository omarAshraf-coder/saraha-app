import express from "express";
import { saveOTP, getOTP, deleteOTP } from "./redis.js";
import { sendEmail } from "./sendEmail.js";

const app = express();
app.use(express.json());

app.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await saveOTP(email, otp);

    await sendEmail({
      to: email,
      subject: "Your OTP Code for Saraha App",
      html: `<h2>Your OTP Code is: <span style="color: blue;">${otp}</span></h2><p>This code expires in 5 minutes.</p>`,
    });

    res.status(200).json({ message: "OTP sent successfully to your email!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const savedOTP = await getOTP(email);

    if (!savedOTP) {
      return res.status(400).json({ message: "OTP expired or invalid!" });
    }

    if (savedOTP !== otp) {
      return res.status(400).json({ message: "Incorrect OTP code!" });
    }

    await deleteOTP(email);

    res.status(200).json({ message: "OTP verified successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});