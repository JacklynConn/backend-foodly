const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

// add item to cart
router.post("/", verifyTokenAndAuthorization, cartController.addProductToCart);
// decrement item quantity
router.get("/decrement/:id", verifyTokenAndAuthorization, cartController.decrementProductQuantity);
// remove item from cart
router.delete("/:id", verifyTokenAndAuthorization, cartController.removeCartItem);
// get cart count
router.get("/count", verifyTokenAndAuthorization, cartController.getCartCount);
// get cart items
router.get("/", verifyTokenAndAuthorization, cartController.getCartItems);

module.exports = router;
