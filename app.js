//third party libraries, Node core nodules
const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

//imports
const usersRoutes = require("./routes/users-routes");
const postsRoutes = require("./routes/posts-routes");
const coordRoutes = require("./routes/coord-routes");
const vincRoutes = require("./routes/vinc-routes");
const idiomasRoutes = require("./routes/idiomas-routes");
const tramitesRoutes = require("./routes/tramites-routes");

const HttpError = require("./models/http-error");

//app
const app = express();

//middlewares
app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/users", usersRoutes);

app.use("/posts", postsRoutes);

app.use("/coordinacion", coordRoutes);

app.use("/vinculacion", vincRoutes);

app.use("/idiomas", idiomasRoutes);

app.use("/tramites", tramitesRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
      console.log("error para subir imagen");
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Error desconocido!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gpw0q.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(8000); //listening on 8000 localhost
  })
  .catch((err) => {
    console.log(err);
  });
