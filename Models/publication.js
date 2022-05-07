const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    name: { type: String,required:true },
  },
  {
    timestamps: { createdAt: true, upDatedAt: true },
  }
);

module.exports = mongoose.model("user", user);
