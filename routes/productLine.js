const express = require("express");
const { productLineController } = require("../controllers");
const router = express.Router();

router.route("/getAllProductLine").get(productLineController.getAllProductLine);
router.route("/create").post(productLineController.createProductLine);
router
  .route("/:id")
  .patch(productLineController.updateProductLine)
  .delete(productLineController.deleteProductLine);

module.exports = router;
