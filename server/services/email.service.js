const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const message = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Your Verification Code</h2>
      <p>Use this OTP to verify your account:</p>
      <h1>${otp}</h1>
      <p>This OTP will expire in <b>10 minutes</b>.</p>
    `
  };

  await transporter.sendMail(message);
};

module.exports = {
  sendVerificationEmail
};