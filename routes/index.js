const authRouter = require("./auth");
const accountRouter = require("./account");
const productRouter = require("./product");
const productLineRouter = require("./productLine");
const infoRouter = require("./info");
const productSetRouter = require("./productSet");

const route = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/account", accountRouter);
  app.use("/api/productSet", productSetRouter);
  app.use("/api/productLine", productLineRouter);
  app.use("/api/product", productRouter);
  app.use("/api/info", infoRouter);
};

module.exports = route;
