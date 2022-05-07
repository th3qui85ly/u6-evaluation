const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    body: { type: String,required:true },
  },
  {
    timestamps: { createdAt: true, upDatedAt: true },
  }
);

module.exports = mongoose.model("user", user);
