const express = require("express");
const userRoutes = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/user.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/signup",
  userMiddleware.registerValidation,
  userMiddleware.checkEmailExist,
  userMiddleware.checkPhoneNumberExist,
  userRoutes.signup
);
router.post(
  "/signin/email",
  userMiddleware.loginEmailValidation,
  userRoutes.signinByEmail
);
router.post(
  "/signin/phone",
  userMiddleware.loginPhoneValidation,
  userRoutes.signinByPhoneNumber
);
router.put(
  "/user/name",
  authMiddleware.isAuthenticate,
  userMiddleware.updateNameValidation,
  userRoutes.updateUserName
);
router.put(
  "/user/email",
  authMiddleware.isAuthenticate,
  userMiddleware.updateEmailValidation,
  userMiddleware.checkEmailExist,
  userRoutes.updateUserEmail
);
router.put(
  "/user/address",
  authMiddleware.isAuthenticate,
  userMiddleware.updateAddressValidation,
  userRoutes.updateUserAddress
);
router.put(
  "/user/phone",
  authMiddleware.isAuthenticate,
  userMiddleware.updatePhoneValidation,
  userMiddleware.checkPhoneNumberExist,
  userRoutes.updateUserPhone
);
router.put(
  "/user/image",
  authMiddleware.isAuthenticate,
  userRoutes.updateUserImage
);
router.put(
  "/user/password",
  authMiddleware.isAuthenticate,
  userMiddleware.updatePasswordValidation,
  userRoutes.updateUserPassword
);
router.put(
  "/user/delete",
  authMiddleware.isAuthenticate,
  userMiddleware.deleteProfileValidation,
  userRoutes.softDeleteUser
);

module.exports = router;
