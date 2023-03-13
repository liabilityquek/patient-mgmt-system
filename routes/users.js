var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users");
  
router.get("/", usersController.index);
router.get("/signup", usersController.directToCreateUser);
router.get("/forget", usersController.directToForgetPassword);
router.post("/signup", usersController.createUserLoginDetails);
router.post("/login", usersController.login);
router.post("/forget", usersController.resetPassword);
router.post("/logout", usersController.logoutSession);
module.exports = router;
