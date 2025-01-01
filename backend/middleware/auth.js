const ensureAuth = (req, res, next) => {
  // console.log(req.header);
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  // const loginUrl = `${process.env.BASE_URL}/login`;
  // console.log("Redirecting to:", loginUrl); // Check if the URL is correct
  return res.send(false);
};

const ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect(`${process.env.BASE_URL}`);
  next();
};

module.exports = {
  ensureAuth,
  ensureGuest,
};
