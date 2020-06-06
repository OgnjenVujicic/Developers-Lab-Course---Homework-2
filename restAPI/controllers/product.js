const Product = require("../models/product");
const BaseController = require("./base")

class ProductController extends BaseController {
    constructor() { 
      super(Product);
    }
  }

module.exports = ProductController