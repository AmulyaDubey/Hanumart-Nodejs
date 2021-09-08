const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  product: {
    type: ObjectId,
    ref: "Product",
  },
  // image: {
  //   type: Buffer,
  // },
});

// reviewSchema.pre("remove", async function (next) {
//   const Product = require("./product.model");
//   let review = this;
//   Product.findByIdAndUpdate(
//     review.product,
//     { $pull: { reviews: review._id } },
//     function (err, test) {
//       if (err) {
//         console.log(err);
//       }
//     }
//   );
// });

module.exports = mongoose.model("Review", reviewSchema);
