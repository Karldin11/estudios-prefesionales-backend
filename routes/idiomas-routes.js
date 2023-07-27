const express = require("express");
const { check } = require("express-validator");

const idiomasControllers = require("../controllers/idiomas-controllers");
const fileUpload = require("../middleware/file-upload");
const router = express.Router();

router.get("/", idiomasControllers.getAllPosts);

router.get("/search/:tema", idiomasControllers.getPostsByKeyword);
router.get("/:pid", idiomasControllers.getPostById);

router.post(
  "/",
  fileUpload.single("imagen"),
  [
    check("titulo").isLength({ min: 5 }),
    check("resumen").not().isEmpty(),
    check("informacion").not().isEmpty(),
  ],
  idiomasControllers.createPost
);

router.patch(
  "/:pid",
  // fileUpload.single("imagen"),
  [check("titulo").isLength({ min: 5 })],
  idiomasControllers.updatePost
);

router.delete("/:pid", idiomasControllers.deletePost);

module.exports = router;
