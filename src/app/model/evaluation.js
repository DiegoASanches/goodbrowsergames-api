const mongoose = require("mongoose");
const EvaluationSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    game:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },
    grade:{
        type: mongoose.Schema.Types.Decimal128,
    }

  }
  );