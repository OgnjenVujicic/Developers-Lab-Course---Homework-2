const Product = require("../models/product");
function findById(id) {
    return new Promise((resolve, reject) => {
        try {
            console.log(id)
            resolve(Product.findById(id).exec())
        } catch (e) {
            console.log(e);
            reject(false)
        }

    })
}

function findAll() {
    return new Promise((resolve, reject) => {
        try {
            resolve(Product.find({}).lean().exec())
        } catch (e) {
            console.log(e);
            reject(false)
        }

    })
}

function create(productToCreate) {
    return new Promise((resolve, reject) => {
        try {
            resolve(Product.create(productToCreate))
        } catch (e) {
            console.log(e);
            reject(false)
        }

    })
}

module.exports = {
    findById,
    findAll,
    create
}