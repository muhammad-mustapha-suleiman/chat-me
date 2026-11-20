import User from "../../models/user.model";
import bcrypt from "bcryptjs";
import generateToken from "../../lib/utils.js";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.json({
        status: 400,
        meassage: "All fields required",
      });
    }

    if (password.length < 6) {
      return res.json({
        status: 400,
        message: "Password length must be at least 6 characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+s/;
    if (!emailRegex.test(email)) {
      return res.json({
        status: 400,
        message: "Invalid email format",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        status: 400,
        message: "Email already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //generateToken(newUser._id, res);
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
    }
  } catch (error) {
    console.log("Error in signup controller: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
