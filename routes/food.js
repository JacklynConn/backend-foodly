const router = require("express").Router();
const foodController = require("../controllers/foodController");

router.post("/", foodController.addFood);
router.get("/:id", foodController.getFoodById);
router.get("/random/:code", foodController.getRandomFood);
router.get("/restaurant-foods/:id", foodController.getFoodsByRestaurant);
router.get("/:category/:code", foodController.getFoodsByCategoryAndCode);
router.get("/search/:search", foodController.searchFoods);
router.get("/random/:category/:code", foodController.getRandomFoodsByCategoryCode);

module.exports = router;
