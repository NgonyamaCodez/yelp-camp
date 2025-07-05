const express = require("express");
const router = express.Router();
const catchAsync = require("../utility/catcjAysnc");
const User = require("../model/user");
const passport = require("passport");
const { storeReturnTo } = require("../middle");
const users = require("../controllers/users");

router.route('/register')
      .get(users.renderRegister)
      .post(catchAsync(users.register));

router.route('/login')
      .get(users.renderLoginForm)
      .post(storeReturnTo,passport.authenticate("local", {failureFlash: true,failureRedirect: "/login",}),users.login)

router.get("/logout", users.logout);

module.exports = router;
