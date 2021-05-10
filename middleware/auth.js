const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {

    const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'] || req.cookies['x-access-token'];
   // console.log(token);
    if (!token)
      return res.status(401).json({ msg: "Brak tokena uwierzytelniającego, autoryzacja odrzucona." });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Weryfikacja tokena nie powiodła się, autoryzacja odrzucona." });
  }
}

module.exports = auth;
