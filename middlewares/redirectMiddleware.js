module.exports = (req, res, next) => {
  if (req.url === "/filmes") return res.redirect(301, "/movies");
  next();
};
