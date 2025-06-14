const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");


router.post("/", categoryController.createCategory);

router.get("/", categoryController.getAllCategories);

router.get("/random", categoryController.getRandomCategory);

module.exports = router;
