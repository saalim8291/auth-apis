const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    return res.status(400).json({
      success: 0,
      message: "User already registered with this email",
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = userModel({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();

    res.status(200).json({
      success: 1,
      message: "You are registered successfully",
    });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json("Invalid credentials");
  } else {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: 0,
        message: "Invalid credentials",
      });
    }

    const payload = {
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(payload, "qwerty", { expiresIn: "24h" });

    return res.status(200).json({
      success: 1,
      token: token,
      message: "You are logged in",
    });
  }
};

module.exports = { signUp, signIn };
