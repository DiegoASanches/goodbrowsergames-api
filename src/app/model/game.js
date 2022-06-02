const mongoose = require("mongoose");
const GameSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
    },
    voteCount: {
        type: Number,
        default: 5,
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
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Game", GameSchema);