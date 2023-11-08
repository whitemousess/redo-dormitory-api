const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const autHeader = req.headers["authorization"];
  if (autHeader) {
    const token = autHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) res.status(403).json("Token is invalid");

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
};
