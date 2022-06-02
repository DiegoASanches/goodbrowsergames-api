const mongoose = require("mongoose");
const RuleSchema = new mongoose.Schema(
    {
      path: {
        type: String,
        required: true
      },
      method: {
        type: String,
        required: true
      },
      method: {
        type: String,
        required: true
      },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
    },
    {
      timestamps: true
    }
  );
  module.exports = mongoose.model("Rule", RoleSchema);