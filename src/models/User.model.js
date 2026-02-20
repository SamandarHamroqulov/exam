const { Schema, model } = require("mongoose");

const UserModel = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      requried: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    is_verified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      default: null,
    },

    otpTime: {
      type: Date,
      default: null,
    },
    
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
module.exports = model("users", UserModel);
