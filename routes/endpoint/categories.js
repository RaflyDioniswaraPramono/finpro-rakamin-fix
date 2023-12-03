const router = require("express").Router();
const CategoriesController = require("../../controller/CategoriesController");

router.post("/categories", CategoriesController.addCategory);
router.get("/categories", CategoriesController.getCategories);
router.get("/categories/:id", CategoriesController.getCategoryById);
router.put("/categories", CategoriesController.updateCategory);
router.delete("/categories/:id", CategoriesController.deleteCategory);

module.exports = router;