const express = require("express");
const { check } = require("express-validator");

const coordControllers = require("../controllers/coord-controllers");
const fileUpload = require("../middleware/file-upload");
const router = express.Router();

router.get("/", coordControllers.getAllPosts);
router.get("/:departamento", coordControllers.getPostsByDepartment);
router.get("/post/:pid", coordControllers.getPostById);

router.post(
  "/",
  fileUpload.single("imagen"),
  [
    check("departamento").isLength({ min: 2 }),
    check("carrera").not().isEmpty(),
    check("datosContacto").not().isEmpty(),
  ],
  coordControllers.createPost
);

router.patch(
  "/post/:pid",
  // fileUpload.single("imagen"),
  [check("departamento").isLength({ min: 2 })],
  coordControllers.updatePost
);

router.delete("/post/:pid", coordControllers.deletePost);

module.exports = router;
