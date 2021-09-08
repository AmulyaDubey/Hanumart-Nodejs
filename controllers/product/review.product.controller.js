const Review = require("../../models/review.model");

exports.postProductReview = async (req, res) => {
  const { rating, description, postedBy } = req.body;
  const product = req.product._id;
  const review = new Review({ rating, description, postedBy, product });
  await review.save();
  const temp = [...req.product.reviews, review];
  const newProductRating = this.calculateRating(temp);
  req.product.reviews.push(review._id);
  req.product.rating = newProductRating;
  await req.product.save();
  res.send(review);
};

exports.reviewById = async (req, res, next, id) => {
  Review.findById(id)
    .populate("product")
    .exec((err, review) => {
      if (err || !review) {
        return res.status(400).json({
          error: "Review not found",
        });
      }
      req.review = review;
      next();
    });
};

exports.getProductReviews = async (req, res) => {
  res.json(req.product.reviews);
};

exports.deleteReview = async (req, res) => {
  req.product.reviews.splice(
    req.product.reviews.findIndex(
      (a) => a._id.toString() === req.review._id.toString()
    ),
    1
  );

  req.product.rating = this.calculateRating(req.product.reviews);

  await req.review.remove();
  await req.product.save();
  res.json(req.product);
};

exports.calculateRating = (reviews) => {
  var result = 0;
  if (reviews.length === 0) return 0;
  reviews.forEach((review) => {
    result += review.rating;
  });
  return (1.0 * result) / reviews.length;
};
