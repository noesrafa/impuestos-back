const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  token: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  registro: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Usuarios", UsersSchema);
