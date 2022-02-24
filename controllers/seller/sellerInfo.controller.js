const Seller = require('../../models/seller.model');

exports.updateSellerProfile=(req, res)=>{
  Object.keys(req.body).map((key)=>{
    req.seller[key]= req.body[key]
  })
  req.seller.save();
  res.json({'message': "Seller profile updated"})
}