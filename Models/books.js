const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    likes: { type: Number,default:0 },
    coverimage: { type: String ,required:true},
    content: { type: String, required: true },
    idpublications: [{ type: mongoose.Types.ObjectId, ref: "publication" }],
    idcomment: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
  },
  {
    timestamps: { createdAt: true, upDatedAt: true },
  }
);

module.exports = mongoose.model("user", user);
