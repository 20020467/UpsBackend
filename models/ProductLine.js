module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "ProductLine",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "product_line_id",
      },
      productSetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "product_set_id",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "name",
      },
      description: {
        type: DataTypes.STRING,
      },
      Characteristic: {
        // đặc trưng
        type: DataTypes.STRING,
      },
      benefit: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Productline",
    }
  );
