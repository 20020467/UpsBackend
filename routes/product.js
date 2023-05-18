const express = require("express");
const { productController } = require("../controllers");
const router = express.Router();

router.post("/importExcel", productController.importExcel);

module.exports = router;
