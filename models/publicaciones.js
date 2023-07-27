const mongoose = require("mongoose"); //Modelo para posts que son generales *numerar en nivel de importancia

const Schema = mongoose.Schema;
//const uniqueValidator = require("mongoose-unique-validator");

const postsSchema = new Schema({
  titulo: { type: String, required: true },
  seccion: { type: String, required: true },
  resumen: { type: String, required: true },
  informacion: { type: String, required: true },
  imagen: { type: String, required: true },
});

//placeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Publicaciones", postsSchema);
