const mongoose = require("mongoose");
const GameSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
    },
    vote_count: {
        type: Number,
        required: true
    },
    poster_path: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019',
    },
    release_date: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Game", GameSchema);