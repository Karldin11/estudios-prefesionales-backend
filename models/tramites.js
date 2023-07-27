const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//const uniqueValidator = require("mongoose-unique-validator");

const tramitesSchema = new Schema({
  titulo: { type: String, required: true },
  resumen: { type: String, required: true },
  informacion: { type: String, required: true },
  imagen: { type: String, required: true },
});

//placeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Tramites", tramitesSchema);
