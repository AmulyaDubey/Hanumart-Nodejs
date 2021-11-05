exports.addToCart = async (req, res) => {
  const { itemId } = req.params;
  const item = { product: itemId, quantity: 1 };
  req.user.cart.push(item);
  await req.user.save();
  res.send(req.user.cart);
};

exports.viewCart = async (req, res) => {
  let hasNull = false;
  req.user.cart = req.user.cart.filter((item) => {
    if (!item.product) {
      hasNull = true;
      return false;
    } else return true;
  });
  if (hasNull) req.user.save();
  res.json(req.user.cart);
};

exports.removeFromCart = async (req, res) => {
  const { itemId } = req.params;
  req.user.cart = req.user.cart.filter((item) => {
    return item._id.toString() != itemId.toString();
  });
  await req.user.save();
  res.json(req.user.cart);
};

exports.updateQuantity = async (req, res) => {
  const { itemId } = req.params;
  console.log({ itemId });
  req.user.cart = req.user.cart.map((item) => {
    if (item._id == itemId) item.quantity = req.body.quantity;
    return item;
  });
  await req.user.save();
  res.json(req.user.cart);
};

exports.emptyCart = async (req, res) => {
  req.user.cart = [];
  await req.user.save();
  res.json(req.user.cart);
};
