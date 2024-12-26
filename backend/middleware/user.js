const ensureSignUp = (req, res, next) => {
  const user = req.user;
  if (user.role === 0 || user.role === 1) return next();
  res.redirect(`${process.env.BASE_URL}/signup`);
};

const ensureNewUser = (req, res, next) => {
  const user = req.user;
  if (!(user.role === 0 || user.role === 1)) return next();
  res.redirect(`${process.env.BASE_URL}`);
};

const ensureCreator = (req, res, next) => {
  const user = req.user;
  if (user.role === 0) return next();
  res.redirect(`${process.env.BASE_URL}`);
};

module.exports = {
  ensureSignUp,
  ensureNewUser,
  ensureCreator,
};
