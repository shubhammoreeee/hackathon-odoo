const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {sendVerificationEmail} = require("../services/email.service");

const signup = async (req, res) => {
  try {
    const { loginId, email, password } = req.body;

    if (!loginId || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (loginId.length < 6 || loginId.length > 12) {
      return res.status(400).json({ message: "Login ID must be 6–12 characters" });
    }

    const checkLogin = await User.findOne({ loginId });
    if (checkLogin) {
      return res.status(400).json({ message: "Login ID already exists" });
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (!passRegex.test(password)) {
      return res.status(400).json({
        message: "Password must include lowercase, uppercase, special char & be >8 characters"
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    // OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
      loginId,
      email,
      password: hashedPass,
      emailOtp: otp,
      emailOtpExpiry: Date.now() + 10 * 60 * 1000,
      isVerified: false
    });

    // Send email OTP
    await sendVerificationEmail(email, otp);

    // Create token
    const token = jwt.sign(
      { id: user._id, loginId: user.loginId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "Signup successful. Verification email sent.",
      token,
      user: {
        id: user._id,
        loginId: user.loginId,
        email: user.email,
        isVerified: user.isVerified
      }
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check already verified
    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // Check OTP
    if (user.emailOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check expiry
    if (user.emailOtpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Update verification
    user.isVerified = true;
    user.emailOtp = undefined;
    user.emailOtpExpiry = undefined;
    await user.save();

    // Create token
    const token = jwt.sign(
      { id: user._id, loginId: user.loginId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Email verified successfully",
     
      user: {
        id: user._id,
        loginId: user.loginId,
        email: user.email,
        isVerified: user.isVerified
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  signup,
verifyEmail
};