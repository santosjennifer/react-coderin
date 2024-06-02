const express = require("express");
const router = express.Router();

const { register, login, getCurrentUser, update, getUserById } = require("../controller/UserController");
const { validate, handleError } = require("../middlewares/handlerValidation");
const { userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/", authGuard, imageUpload.single("profileImage"), userUpdateValidation(), validate, update, handleError);
router.get("/:id", getUserById);

module.exports = router;