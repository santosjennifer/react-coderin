const express = require("express");
const router = express.Router();

const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto, likePhoto, commentPhoto, searchPhotos } = require("../controller/PhotoController");

const { photoInsertValidation, photoUpdateValidation, commentValidation } = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const { validate, handleError } = require("../middlewares/handlerValidation");
const { imageUpload } = require("../middlewares/imageUpload");

router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto, handleError);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);
router.get("/search", authGuard, searchPhotos);
router.get("/:id", authGuard, getPhotoById);
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);
router.put("/like/:id", authGuard, likePhoto);
router.put("/comment/:id", authGuard, commentValidation(), validate, commentPhoto);

module.exports = router;