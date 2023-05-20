const express = require("express");
const { productSetController } = require("../controllers");
const router = express.Router();

router.route("/getAllProductSet").get(productSetController.getAllProductSet);
router.route("/create").post(productSetController.createProductSet);
router
  .route("/:id")
  .patch(productSetController.updateProductSet)
  .delete(productSetController.deleteProductSet);

module.exports = router;
