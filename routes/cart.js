const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

router.post("/", verifyTokenAndAuthorization, cartController.addProductToCart);

router.get("/", verifyTokenAndAuthorization, cartController.getCartItems);

module.exports = router;
