const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatarUrl: String,
  savedBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: "SavedBook",
      default: [],
    },
  ],
  createdBooks: [
    {
      type: Schema.Types.ObjectId,
      ref: "CreatedBook",
      default: [],
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
