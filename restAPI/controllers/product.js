const Product = require("../models/product");
const BaseController = require("./base")

class ProductController extends BaseController {
    constructor() { 
      super(Product);
    }
    async product_dec(id){
      let pr; 
      pr = await Product.findOne({_id:id})
      if(pr.quantity > 1){
        pr.quantity = pr.quantity - 1;
        pr.save();
        return {messsage: "Product quantity decreased."}
      }
      else{
        throw new Error("Quantity is already at value 1")
      }
    }
    async product_inc(id){
      let pr; 
      pr = await Product.findOne({_id:id})
      pr.quantity = pr.quantity + 1;
      pr.save();
      return {messsage: "Product quantity increased."}
    }
    async product_num(id){
      let pr; 
      pr = await Product.findOne({_id:id})
      return {quantity: pr.quantity}
    }
    async product_profit(id){
      let user_products; 
      user_products = await Product.find({user:id})
      let count = 0;
      for(let i = 0 ; i < user_products.length ; i++ ){
        count = count + (user_products[i].quantity * user_products[i].price)
      }
      return {messsage: `Total possible profit: ${count}`}
    }
  }

module.exports = ProductController