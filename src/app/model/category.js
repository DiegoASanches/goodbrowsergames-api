const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema(
  {
    descryption: {
        type: String,
        required: true,
        index: {unique:true}
    },
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Category", CategorySchema);