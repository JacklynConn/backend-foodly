const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUser);
router.delete("/", userController.deleteUser);
router.put("/verify/:otp", userController.verifyAccount);
router.put("/verify-phone/:phone", userController.verifyPhone);

module.exports = router;
