var express = require('express');
var router = express.Router();
const {isAuth} = require("../controllers/users");

/* GET home page. */
router.get('/', isAuth, function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
