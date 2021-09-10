const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const User = require("./user.model");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "New Group",
  },
  members: [
    {
      type: ObjectId,
      ref: User,
    },
  ],
});

module.exports = mongoose.model("Group", groupSchema);
