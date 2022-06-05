const mongoose = require("mongoose");
const GameSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        index: {unique:true}
    },
    voteCount: {
        type: Number,
    },
    posterPath: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019',
    },
    overview: {
        type: String,
        required: true,
    },
    release_date: {
        type: String,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      }
    ]
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Game", GameSchema);