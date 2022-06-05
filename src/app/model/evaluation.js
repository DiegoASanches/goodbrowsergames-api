const mongoose = require("mongoose");
const EvaluationSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username: {
      type: String
    },
    game:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },
    description: {
      type: String
    },
    grade:{
        type: mongoose.Schema.Types.Decimal128,
    }

  }
  );
  module.exports = mongoose.model("Evaluation", EvaluationSchema);