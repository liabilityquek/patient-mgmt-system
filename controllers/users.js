const User = require("../models/users");
const bcrypt = require("bcrypt");
const sendEmail = require('../app/index');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { createUserToken } = require('../jwt/auth');
const secret = process.env.JWT_SECRET;
const { promisify } = require('util');


const index = async (req, res) => {
  res.render("users/login", { message: "" });
};

const directToCreateUser = async (req, res) => {
  res.render("users/signup", { message: "" });
};

const createUserLoginDetails = async (req, res) => { //ok
  const email = req.body.email;
  const userid = req.body.userid;
  const password = req.body.password;
  console.log(req.body);

  if(password.length < 3){
    res.render('users/signup', {message: "Password must be at least 3 characters or more!"});
    return;
  }
    
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ email: email, userid: userid, password:passwordHash });

    if (res.status(201)) {
      res.redirect("/users");
    }
    // res.status(201).json({
    //   status: 'Success',
    //   data: {
    //     user: user
    //   }
    // })
  } catch (err) {
    if (err.code === 11000){
      res.render('users/login', {message: "Userid already exist!"});
      return;
    }
  }
};

const login = async (req, res) => { //ok
  const userid = req.body.userid;
  const password = req.body.password;
  console.log(req.body);


  try {
    const user = await User.findOne({ userid: userid }).exec();

    if (!user) {
      res.render("users/login", { message: "Invalid password or user!" });
      return;
    }
    const token = createUserToken(req, user);
    console.log(`token: ${token}`);
    //console.log(`requireToken: ${requireToken}`);

    res.redirect("/");
  } catch (err) {
    res.render("users/login", { message: "Invalid password or user!" });
  }

  //   const checkMatch = await bcrypt.compare(password, user.password);

  //   if (checkMatch) {
  //     const token = createUserToken(req, user);
  //     console.log(`token: ${token}`);

  //     res.redirect("/");
  //   } else {
  //     res.render("users/login", { message: "Invalid password or user!" });
  //   }
  // } catch (err) {
  //   res.render("users/login", { message: "Invalid password or user!" });
  // }
};

const directToForgetPassword = async (req, res) => {
  res.render("users/forget", { message: "" });
};

const resetPassword = async (req, res) => {
  const userid = req.body.userid;
  const password = req.body.password;
  console.log('resetPassword');
  console.log(req.body);

  if(password.length < 3){
    res.render('users/forget', {message: "Password must be at least 3 characters or more!"});
    return;
  }

  try {
    const user = await User.findOne({ userid: userid}).exec();

    if (!user) { //not ok
      res.render("users/forget", { message: "Invalid User!" });
      return;
    }

    const checkMatch = await bcrypt.compare(password, user.password);

    if (checkMatch) {
      res.render('users/forget', {message: "Reset password cannot be the same as existing password!"});
      return;
    }
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      user.password = hash;
      await user.save();
      res.redirect("/users");

        await sendEmail({
          email: user.email, 
          subject: 'Reset Password Request',
        });          
    
  } catch (err) {
    res.render("users/error", { message: err });
  }
};


// const isAuth = async (req, res, next) => {
//   const sessionId = req.session.sessionId;
//   console.log('Session Id: ', sessionId);

//   if (req.session.userid && sessionId === req.session.id) {
//     const user = await User.findOne({userid: req.session.userid}).exec();
//     res.locals.user = user;
//     next();
//   } else {
//     res.status(403).send(req.session);
//   }
// }

// const login = async (req, res) => { //ok
//   const userid = req.body.userid;
//   const password = req.body.password;
//   const sessionId = req.session.sessionId;
//   console.log(req.body);
//   console.log('Session Id: ', sessionId);

//   try {
//     const user = await User.findOne({ userid: userid }).exec();

//     if (!user) {
//       res.render("users/login", { message: "Invalid User!" });
//       return;
//     }

//     const checkMatch = await bcrypt.compare(password, user.password);

//     if (checkMatch) {
//       console.log(req.body);
//       sessionId = userid;
//       res.redirect("/");
//     } else {
//       res.render("users/login", { message: "Invalid password!" });
//     }
//   } catch (err) {
//     res.render("users/login", { message: "Invalid User!" });
//   }
// };



const isAuth = async (req, res, next) => {
//let token;
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGRlYzZkOTJiMmQ3NjA3YjZmZmE2ZiIsImlhdCI6MTY3ODYzNjUzMSwiZXhwIjoxNjc4NjcyNTMxfQ.InCj1kvgc6COuAGmqam7EYOt2em3q1-nPB8b9jwsKbQ';
  // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  //   token = req.headers.authorization.split(' ')[1];
  //   console.log(`token: ${token}`);
  // }
  if (!token) {
    return res.status(401).json({ error: "You are not logged in. Please log in to get access." });
  }
  try {
    const decodedToken = jwt.verify(token, secret);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      throw new Error('User not found');
    }
    // Check if the user id matches the id in the token payload
    if (user._id.toString() !== decodedToken.id) {
      throw new Error('Token verification failed');
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};


 
module.exports = {
  index,
  login,
  createUserLoginDetails,
  directToCreateUser,
  directToForgetPassword,
  resetPassword,
  isAuth
};
