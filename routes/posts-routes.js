const express = require("express");
const { check } = require("express-validator");

const postsControllers = require("../controllers/posts-controllers");
const fileUpload = require("../middleware/file-upload");
const router = express.Router();

router.get("/", postsControllers.getAllPosts);
router.get("/search/:tema", postsControllers.getPostsByKeyword);

router.get("/:seccion", postsControllers.getPostsBySection);
router.get("/post/:pid", postsControllers.getPostById);

router.post(
  "/",
  fileUpload.single("imagen"),
  [
    check("titulo").isLength({ min: 2 }),
    // check("seccion").not().isEmpty(),
    check("resumen").not().isEmpty(),
    check("informacion").not().isEmpty(),
  ],
  postsControllers.createPost
);

router.patch(
  "/post/:pid",
  // fileUpload.single("imagen"),
  [check("titulo").isLength({ min: 2 }), check("seccion").not().isEmpty()],
  postsControllers.updatePost
);

router.delete("/post/:pid", postsControllers.deletePost);

module.exports = router;
