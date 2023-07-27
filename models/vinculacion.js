const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//const uniqueValidator = require("mongoose-unique-validator");

const vinculacionSchema = new Schema({
  carrera: { type: String, required: true },
  departamento: { type: String, required: true },
  datosContacto: { type: String, required: true },
  imagen: { type: String, required: true },
});

//placeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Vinculacion", vinculacionSchema);
