const fs = require("fs"); //

const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Vinculacion = require("../models/vinculacion");

const getAllPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Vinculacion.find({});
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not fetch posts",
      500
    );
    return next(error);
  }

  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
  console.log(posts.length);
};

const getPostsByDepartment = async (req, res, next) => {
  const departamento = req.params.departamento;

  let postsDepartamentos;
  try {
    postsDepartamentos = await Vinculacion.find({ departamento });
  } catch (err) {
    const error = new HttpError(
      "Fetching department orders failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    posts: postsDepartamentos.map((postsDepartamentos) =>
      postsDepartamentos.toObject({ getters: true })
    ),
  });
};

const getPostById = async (req, res, next) => {
  const postId = req.params.pid;
  console.log("se identifico id" + postId);
  let post;
  try {
    post = await Vinculacion.findById(postId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find post",
      500
    );
    return next(error);
  }

  if (!post) {
    const error = new HttpError(
      "Could not find post for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ post: post.toObject({ getters: true }) });
};

const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { carrera, departamento, datosContacto } = req.body;

  const createdPost = new Vinculacion({
    carrera,
    departamento,
    datosContacto,
    imagen: req.file.path,
  });

  console.log("datos:" + createdPost);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPost.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating place with transaction failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ post: createdPost });
};

const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { carrera, departamento, datosContacto, imagen } = req.body;
  const postId = req.params.pid;

  let post;
  try {
    post = await Vinculacion.findById(postId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update post.",
      500
    );
    return next(error);
  }

  post.carrera = carrera;
  post.departamento = departamento;
  post.datosContacto = datosContacto;
  //post.imagen = imagen;

  try {
    await post.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update post.",
      500
    );
    return next(error);
  }

  res.status(200).json({ post: post.toObject({ getters: true }) });
};

const deletePost = async (req, res, next) => {
  console.log("entro a delete, boton funciona");
  const postId = req.params.pid;

  let post;
  try {
    post = await Vinculacion.findById(postId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find and delete post.",
      500
    );
    return next(error);
  }

  if (!post) {
    const error = new HttpError("Could not find post for this id.", 404);
    return next(error);
  }

  const imagePath = post.imagen;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await post.remove({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete post.",
      500
    );
    return next(error);
  } //

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Deleted post." });
};

exports.getAllPosts = getAllPosts;
exports.getPostsByDepartment = getPostsByDepartment;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
