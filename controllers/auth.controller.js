import User from "../model/User.js";
import userDataValidation from "../validation/userDataValidation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const postRegister = async (req, res, next) => {
  // Data Validation
  const { error } = userDataValidation(req.body);

  if (error) {
    return res
      .status(400)
      .json({ error: true, data: error.details[0].message });
  }

  // Is User already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ error: true, data: "Email already exists" });

  // Hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPass,
  });

  try {
    const savedUser = await user.save();
    res.send({ error: false, user: user._id });
  } catch (err) {
    res.status(400).send({ error: true, error: err });
  }
};

const postLogin = async (req, res, next) => {
  // Data Validation
  const { error } = userDataValidation(req.body);

  if (error) {
    return res
      .status(400)
      .json({ error: true, data: error.details[0].message });
  }

  // If email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .json({ error: true, data: "Email or password is wrong" });
  // Is password correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
};

export { postRegister, postLogin };
