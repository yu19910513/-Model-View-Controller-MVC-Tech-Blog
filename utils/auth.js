const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    next();
  }
};
const adminAuth = (req, res, next) => {
  if (!req.session.admin) {
    res.redirect('/homepage');
  } else {
    next();
  }
}
module.exports = withAuth;
