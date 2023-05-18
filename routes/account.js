const express = require("express");
const { accountController } = require("../controllers");
const router = express.Router();
const upload = require("../middlewares/upload");

router.post(
  "/importExcel",
  upload.single("file"),
  accountController.importExcel
);

module.exports = router;
