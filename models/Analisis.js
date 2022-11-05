const mongoose = require("mongoose");

const AnalisisSchema = mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  mes: {
    type: String,
    required: true,
    trim: true,
    unique: false
  },
  year: {
    type: Number,
    required: true,
    trim: true,
    unique: false
  },
  ingresosTotales: {
    type: Number,
    required: true,
    trim: true,
  },
  gastosTotales: {
    type: Number,
    required: true,
    trim: true,
  },
  isr: {
    type: Number,
    trim: true,
  },
  iva: {
    type: Number,
    trim: true,
  },
  isrRetenido: {
    type: Number,
    trim: true,
  },
  ivaRetenido: {
    type: Number,
    trim: true,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Analisis", AnalisisSchema);
