const express = require("express");
const { check } = require("express-validator");

const tramitesControllers = require("../controllers/tramites-controllers");
const fileUpload = require("../middleware/file-upload");
const router = express.Router();

router.get("/", tramitesControllers.getAllPosts);

router.get("/search/:tema", tramitesControllers.getPostsByKeyword);

router.get("/:pid", tramitesControllers.getPostById);

router.post(
  "/",
  fileUpload.single("imagen"),
  [
    check("titulo").isLength({ min: 5 }),
    check("resumen").not().isEmpty(),
    check("informacion").not().isEmpty(),
  ],
  tramitesControllers.createPost
);

router.patch(
  "/:pid",
  // fileUpload.single("imagen"),
  [check("titulo").isLength({ min: 5 })],
  tramitesControllers.updatePost
);

router.delete("/:pid", tramitesControllers.deletePost);

module.exports = router;
