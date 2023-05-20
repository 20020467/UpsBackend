const sequelize = require("../config/db");
const { Product, Info } = require("../models");
const xlsx = require("xlsx");
const readXlsxFile = require("read-excel-file/node");

// [POST]  /api/product/importExcel
const importExcel = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path = __basedir + "/resources/" + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let products = [];
      let infos = [];

      rows.forEach((row) => {
        let product = {
          productLineId: row[0],
          name: row[1],
          theFirm: row[2],
          code: row[3],
          status: row[4],
          origin: row[5],
          wattage: row[6],
          guarantee: row[7],
          description: row[8],
        };

        let info = {
          Capacity: row[9],
          phaseNumber: row[10],
          Technology: row[11],
          isolationTransformer: row[12],
          ACInputVoltage: row[13],
          VoltageRange: row[14],
          FrequencyRange: row[15],
          powerFactorIN: row[16],
          OutputACVoltage: row[17],
          ACVoltageRegulator: row[18],
          SynFrequencyRange: row[19],
          BatteryFrequencyRange: row[20],
          timeACtobattery: row[21],
          timeInterverBypass: row[22],
          wave: row[23],
          powerFactorOUT: row[24],
          battery: row[25],
          numberOfBattery: row[26],
          ChargingCurrent: row[27],
          ChargingVoltage: row[28],
          ACMode: row[29],
          batteryModeEfficiency: row[30],
          LCDScreen: row[31],
          batteryWaring: row[32],
          lowBattery: row[33],
          overLoad: row[34],
          error: row[35],
          ProductDimensions: row[36],
          mass: row[37],
          NoiseLevel: row[38],
          ActiveHumidity: row[39],
          USB: row[40],
        };

        products.push(product);
        infos.push(info);
      });

      sequelize.transaction((t) => {
        return Product.bulkCreate(products, { returning: true, transaction: t })
          .then((createdProducts) => {
            const productIds = createdProducts.map((product) => product.id);
            const infosWithProductId = infos.map((info, index) => ({
              ...info,
              productID: productIds[index],
            }));

            return Info.bulkCreate(infosWithProductId, {
              returning: true,
              transaction: t,
            });
          })
          .then(() => {
            res.status(200).send({
              message:
                "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

// [GET]  /api/product/getAllProduct
const getAllproduct = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

// @route     [PATCH] /api/product/:id
const updateProduct = async (req, res, next) => {
  try {
    const update = await Product.update(
      {
        productLineId: req.body.productLineId,
        name: req.body.name,
        theFirm: req.body.theFirm,
        code: req.body.code,
        status: req.body.status,
        origin: req.body.origin,
        wattage: req.body.wattage,
        guarantee: req.body.guarantee,
        description: req.body.description,
        feature: req.body.feature,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!update[0]) {
      return next({
        message: `update product failed for productId - ${req.params.id}`,
      });
    }

    return res.status(201).send({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

// @route     [DELETE] /api/product/:id
const deleteProduct = async (req, res, next) => {
  return new Promise(async () => {
    const t = await sequelize.transaction();
    const productID = req.params.id;
    try {
      // Xóa thông tin liên quan từ bảng "Info"
      await Info.destroy({ where: { productID }, transaction: t });

      // Xóa sản phẩm từ bảng "Product"
      await Product.destroy({ where: { id: productID }, transaction: t });

      await t.commit();
      res.status(200).json("Product and related info deleted successfully!");
    } catch (error) {
      await t.rollback();
      next(error);
    }
  });
};

// @route     [GET] /api/product/:id
const getProductbyID = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  importExcel,
  getAllproduct,
  updateProduct,
  deleteProduct,
  getProductbyID,
};
