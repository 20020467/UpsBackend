module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "ProductSet",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "product_set_id",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "name",
      },
    },
    {
      tableName: "ProductSet",
    }
  );
