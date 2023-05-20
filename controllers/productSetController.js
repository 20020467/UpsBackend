const { ProductSet } = require("../models");

// @route     [POST] /api/productSet/create
const createProductSet = async (req, res, next) => {
  try {
    const productSet = await ProductSet.create({
      name: req.body.name,
    });

    if (!productSet) {
      throw new Error("Details are not correct");
    }

    return res.status(201).send({
      success: true,
      data: productSet,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// @route     [PATCH] /api/productSet/:id
const updateProductSet = async (req, res, next) => {
  try {
    const update = await ProductSet.update(
      {
        name: req.body.name,
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
const deleteProductSet = async (req, res, next) => {
  try {
    const { username, password } = req.body;
  } catch (error) {
    next(error);
  }
};

//  [GET] /api/productSet/getAllProductSet
const getAllProductSet = async (req, res, next) => {
  try {
    const productSets = await ProductSet.findAll();
    res.status(200).json({
      success: true,
      data: productSets,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProductSet,
  updateProductSet,
  deleteProductSet,
  getAllProductSet,
};
