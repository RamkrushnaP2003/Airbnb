const User = require("../models/user");

module.exports.renderSignUp = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const reigsteredUser = await User.register(newUser, password);
    console.log(reigsteredUser);
    req.login(reigsteredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to AirBnB");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to AirBnB! You are logged in.");
  let redirectUrl = res.locals.redirectUrl;
  redirectUrl ? res.redirect(redirectUrl) : res.redirect("/listings");
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};
