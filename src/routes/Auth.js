const express = require("express");
const router = express.Router();

const AuthControllers = require("../controllers/Auth.controller");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/CheckLogin");
const upload = require("../middleware/upload");

router.post(
  "/create-user",
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
  verifyTokenAndAuthorization,
  upload.single("avatar"),
  AuthControllers.editCurrentUser
);

router.get("/get-current", verifyTokenAndAuthorization, AuthControllers.getCurrent);
router.get("/get-all-users", verifyTokenAndAdmin, AuthControllers.getAllUsers),
router.get("/:id/get-current", verifyTokenAndAdmin, AuthControllers.getCurrentById);
router.put(
  "/:id/edit",
  verifyTokenAndAdmin,
  upload.single("avatar"),
  AuthControllers.editUser
);
router.post("/login", AuthControllers.login);

module.exports = router;
