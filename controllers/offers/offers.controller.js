const Offer = require("../../models/offer.model");

exports.offerById = async (req, res, next, id) => {
  Offer.findById(id).exec((err, offer) => {
    if (err || !offer) {
      return res.status(400).json({
        error: "Offer not found",
      });
    }
    req.offer = offer; // adds offer object in req with user info
    next();
  });
};

exports.addOffer = async (req, res) => {
  const offer = new Offer(req.body);
  const offerCode = offer.code;
  const offerExists = await Offer.findOne({ code: offerCode });

  if (offerExists)
    return res.status(403).json({
      error: "Offer Code is taken!",
    });
  await offer.save();
  res.json({ message: "Offer added" });
};

exports.updateOffer = async (req, res) => {
  const updatedOffer = req.body;
  Object.keys(updatedOffer).map((offerKey) => {
    req.offer[offerKey] = updatedOffer[offerKey];
  });
  await req.offer.save();
  res.json({ message: "Offer updated" });
};

exports.deleteOffer = async (req, res) => {
  await req.offer.delete();
  res.json({ message: "Offer deleted" });
};

exports.getSellerOffers = async (req, res) => {
  const { sellerId } = req.params;
  Offer.find({ sellerId }).exec((err, offersList) => {
    if (err) {
      return res.json({ error: err });
    }
    console.log(offersList)
    return res.json(offersList)
  });
};
