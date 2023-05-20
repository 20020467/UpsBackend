module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "product_id",
      },
      productLineId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        field: "product_line_id",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      theFirm: {
        // hãng
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        // mã sản phẩm
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        //trạng thái
        type: DataTypes.STRING,
        allowNull: false,
      },
      origin: {
        //xuất xứ
        type: DataTypes.STRING,
        allowNull: false,
      },
      wattage: {
        //công suất
        type: DataTypes.STRING,
        allowNull: false,
      },
      guarantee: {
        // bảo hành
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      feature: {
        // chức năng chính
        type: DataTypes.STRING,
        // allowNull: false,
      },
    },
    {
      tableName: "Product",
    }
  );
