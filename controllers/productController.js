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
          feature: row[9],
        };

        let info = {
          cong_suat: row[10],
          dai_dien_ap: row[11],
          tan_so_vao: row[12],
          so_pha: row[13],
          dien_ap: row[14],
          dien_ap_che_do_ac_quy: row[15],
          tan_so_ra: row[16],
          dang_song: row[17],
          thoi_gian_chuyen_mach: row[18],
          loai_ac_quy: row[19],
          thoi_gian_sac: row[20],
          bv_ngan_mach: row[21],
          bv_xung: row[22],
          canh_bao: row[23],
          bv_qua_tai: row[24],
          quan_ly_ac_quy: row[25],
          cong_USB: row[26],
          do_on_hd: row[27],
          nhiet_do_hd: row[28],
          do_am_hd: row[29],
          he_so_cong_suat: row[30],
          kich_thuoc: row[31],
          trong_luong: row[32],
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
