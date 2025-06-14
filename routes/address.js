const router = require("express").Router();
const addressController = require("../controllers/addressController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");

// add address
router.post("/", verifyTokenAndAuthorization, addressController.addAddress);
router.get("/default", verifyTokenAndAuthorization, addressController.getDefaultAddress);
// get all addresses
router.get("/", verifyTokenAndAuthorization, addressController.getAllAddresses);
// delete address by id
router.delete("/:id", verifyTokenAndAuthorization, addressController.deleteAddress);
// set default address by id
router.patch("/default/:id", verifyTokenAndAuthorization, addressController.setDefaultAddress);

module.exports = router;
