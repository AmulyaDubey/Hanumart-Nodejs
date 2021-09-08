const User = require("../../models/user.model");

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .populate("cart.product")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      req.user = user;
      next();
    });
};




