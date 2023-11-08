const express = require("express");
const router = express.Router();

const AuthControllers = require("../controllers/Auth.controller");
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middleware/CheckLogin");
const upload = require("../middleware/upload");

router.post(
  "/create-user",verifyTokenAndAdmin,
  upload.single("avatar"),
  AuthControllers.createUser
);
router.delete(
  "/:id/delete-user",
  verifyTokenAndAdmin,
  AuthControllers.deleteUser
);
router.put(
  "/edit-current-user",
  verifyToken,
  upload.single("avatar"),
  AuthControllers.editCurrentUser
);

router.get("/get-current", verifyToken, AuthControllers.getCurrent);
router.get("/get-all-users", verifyTokenAndAdmin, AuthControllers.getAllUsers),
  router.get(
    "/:id/get-current",
    verifyTokenAndAdmin,
    AuthControllers.getCurrentById
  );
router.put(
  "/:id/edit",
  verifyTokenAndAdmin,
  upload.single("avatar"),
  AuthControllers.editUser
);
router.post("/login", AuthControllers.login);

module.exports = router;
