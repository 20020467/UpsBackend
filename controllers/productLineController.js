const { ProductLine } = require("../models");

// @route     [POST] /api/productLine/create
const createProductLine = async (req, res, next) => {
  try {
    const productLine = await ProductLine.create({
      productSetId: req.body.productSetId,
      name: req.body.name,
      description: req.body.description,
      Characteristic: req.body.Characteristic,
      benefit: req.body.benefit,
    });

    if (!productLine) {
      throw new Error("Details are not correct");
    }

    return res.status(201).send({
      success: true,
      data: productLine,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// @route     [PATCH] /api/productLine/:id
const updateProductLine = async (req, res, next) => {
  try {
    const update = await ProductLine.update(
      {
        name: req.body.name,
        description: req.body.description,
        Characteristic: req.body.Characteristic,
        benefit: req.body.benefit,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!update[0]) {
      return next({
        message: `update product line failed for productLineId - ${req.params.id}`,
      });
    }

    return res.status(201).send({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

// ??
const deleteProductLine = async (req, res, next) => {
  try {
    const { username, password } = req.body;
  } catch (error) {
    next(error);
  }
};

//  [GET] /api/productLine/getAllProductLine
const getAllProductLine = async (req, res, next) => {
  try {
    const productLines = await ProductLine.findAll();
    res.status(200).json({
      success: true,
      data: productLines,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProductLine,
  updateProductLine,
  deleteProductLine,
  getAllProductLine,
};
