import mongoose from "mongoose";

const userShema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
      minLength: 3,
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
    },

    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }, //time stamps
);

const User = mongoose.model("User", userSchema);

export default User;
