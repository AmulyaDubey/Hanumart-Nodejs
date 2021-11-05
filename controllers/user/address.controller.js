const Address = require("../../models/address.model");
const User = require("../../models/user.model");

exports.addressById = (req, res, next, id) => {
  Address.findById(id)
    .populate("postedBy")
    .exec((err, address) => {
      if (err || !address) {
        return res.status(400).json({
          error: "Address not found",
        });
      }
      req.address = address;
      next();
    });
};

exports.getUserAddress = (req, res)=>{
  res.send(req.user.address)
}

exports.addUserAddress = async (req, res) => {
  const postedBy = req.user._id;
  const addressData = {
    ...req.body,
    postedBy,
  };
  const address = new Address(addressData);
  await address.save();
  req.user.address.push(address._id);
  await req.user.save();
  res.json(address);
};

exports.removeAddress = async (req, res) => {
  const { addressId } = req.params;

  //remove from user address
  const user = req.address.postedBy;
  user.address.splice(
    user.address.findIndex((a) => a._id.toString() === addressId.toString()),
    1
  );
  if (user.recentAddress.toString() === addressId.toString())
    user.recentAddress = undefined;
  user.save();

  //remove from db if inactive
  if (req.address.isActive === false) {
    req.address.remove();
  }
  res.json({ message: "Removed address" });
};
