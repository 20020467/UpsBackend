const sequelize = require("../config/db.js");
const { DataTypes } = require("sequelize");

const AccountModel = require("./Account.js");
const ProductModel = require("./Product.js");
const ProductLineModel = require("./ProductLine.js");
const InfoModel = require("./Info.js");

const Account = AccountModel(sequelize, DataTypes);
const Product = ProductModel(sequelize, DataTypes);
const ProductLine = ProductLineModel(sequelize, DataTypes);
const Info = InfoModel(sequelize, DataTypes);

ProductLine.hasMany(Product, {
  foreignKey: "product_line_id",
  allowNull: false,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Product.hasOne(Info, {
  foreignKey: "product_id",
  allowNull: false,
});

module.exports = {
  Account,
  Product,
  ProductLine,
  Info,
};
