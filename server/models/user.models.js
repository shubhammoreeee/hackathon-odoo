const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    loginId: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 12,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },

    // Email verification fields
    isVerified: {
      type: Boolean,
      default: false
    },
    emailOtp: {
      type: String
    },
    emailOtpExpiry: {
      type: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
