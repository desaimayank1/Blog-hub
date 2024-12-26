const ensureAuth = (req, res, next) => {
  console.log(req.header);
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(`${process.env.BASE_URL}/login`);
};

const ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect(`${process.env.BASE_URL}`);
  next();
};

module.exports = {
  ensureAuth,
  ensureGuest,
};
