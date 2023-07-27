const express = require("express");
const { check } = require("express-validator");

const vincControllers = require("../controllers/vinc-controllers");
const fileUpload = require("../middleware/file-upload");
const router = express.Router();

router.get("/", vincControllers.getAllPosts);
router.get("/:departamento", vincControllers.getPostsByDepartment);
router.get("/post/:pid", vincControllers.getPostById);

router.post(
  "/",
  fileUpload.single("imagen"),
  [
    check("departamento").isLength({ min: 2 }),
    check("carrera").isLength({ min: 2 }),
    check("datosContacto").not().isEmpty(),
  ],
  vincControllers.createPost
);

router.patch(
  "/post/:pid",
  // fileUpload.single("imagen"),
  [check("departamento").isLength({ min: 2 })],
  vincControllers.updatePost
);

router.delete("/post/:pid", vincControllers.deletePost);

module.exports = router;
