const User = require("../models/users");
const bcrypt = require("bcrypt");
const sendEmail = require("../app/index");
const saltRounds = 10;

const index = async (req, res) => {
  res.render("users", { message: "" });
};

const directToCreateUser = async (req, res) => {
  res.render("users/signup", { message: "" });
};

const createUserLoginDetails = async (req, res) => {
  //ok
  const email = req.body.email;
  const userid = req.body.userid;
  const password = req.body.password;
  console.log(req.body);

  if (password.length < 3) {
    res.render("users/signup", {
      message: "Password must be at least 3 characters or more!",
    });
    return;
  }

  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      email: email,
      userid: userid,
      password: passwordHash,
    });

    if (res.status(200)) {
      res.redirect("/");
    }
  } catch (err) {
    if (err.code === 11000) {
      res.render("users/signup", { message: "Userid already exist!" });
    }else if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      res.render("users/signup", { message: errors });
  }else{console.log(err);
    res.render("users/error", { message: err });
  }
};
}

const directToForgetPassword = async (req, res) => {
  res.render("users/forget", { message: "" });
};

const resetPassword = async (req, res) => {
  const userid = req.body.userid;
  const password = req.body.password;
  console.log("resetPassword");
  console.log(req.body);

  if (password.length < 3) {
    res.render("users/forget", {
      message: "Password must be at least 3 characters or more!",
    });
    return;
  }

  try {
    const user = await User.findOne({ userid: userid }).exec();

    if (!user) {
       res.render("users/forget", { message: "Invalid User!" });
      return;
    }

    const checkMatch = await bcrypt.compare(password, user.password);

    if (checkMatch) {
      res.render("users/forget", {
        message: "Reset password cannot be the same as existing password!",
      });
      return;
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    await user.save();
    res.redirect("/");

    await sendEmail({
      email: user.email,
      subject: "Reset Password Request",
    });
  } catch (err) {
    res.render("users/forget", { message: err });
  }
};

const login = async (req, res) => {
  const userid = req.body.userid;
  const password = req.body.password;
  const id = req.session.id;
  console.log("Session Id: ", id);

  try {
    const user = await User.findOne({ userid: userid }).exec();

    if (!user) {
      res.render("users", { message: "Invalid Credentials!" });
      return;
    }

    const checkMatch = await bcrypt.compare(password, user.password);

    if (checkMatch) {
      console.log(req.body);
      req.session.userId = user._id;
      console.log(`req.session.userId: ${req.session.userId}`);
      res.redirect("/patients");
    } else {
      res.render("users", { message: "Invalid Credentials!" });
    }
  } catch (err) {
    res.render("users", { message: "Invalid Credentials!" });
  }
};

const isAuth = async (req, res, next) => {
  const userId = req.session.userId;
  console.log("userId isAuth: ", userId);
  if (userId) {
    const user = await User.findById(userId).exec();

    if (user) {
      req.user = user;
      console.log(`req.user: ${req.user}`);
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  } else {
    res.redirect("/");
  }
};

const logoutSession = async (req, res) => {

  if (req.session) {
    req.session.destroy();
    console.log("Session destroyed");
  }
  res.redirect("/");
};

module.exports = {
  index,
  login,
  createUserLoginDetails,
  directToCreateUser,
  directToForgetPassword,
  resetPassword,
  isAuth,
  logoutSession
};
