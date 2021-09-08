exports.addToWishlist = async (req, res) => {
  const { itemId } = req.params;
  req.user.wishlist.push(itemId);
  await req.user.save();
  res.json(req.user.wishlist);
};

exports.removeFromWishlist = async (req, res) => {
  const { itemId } = req.params;
  req.user.filter((item) => item._id != itemId);
  await req.user.save();
  res.json(req.user.wishlist);
};
