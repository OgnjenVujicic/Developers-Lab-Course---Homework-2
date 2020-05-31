const User = require("../models/user");
function findById(id) {
    return new Promise((resolve, reject) => {
        try {
            console.log(id)
            resolve(User.findById(id).exec())
        } catch (e) {
            console.log(e);
            reject(false)
        }

    })
}

function findAll() {
    return new Promise((resolve, reject) => {
        try {
            resolve(User.find({}).lean().exec())
        } catch (e) {
            console.log(e);
            reject(false)
        }

    })
}

function create(userToCreate) {
    return new Promise((resolve, reject) => {
        try {
            resolve(User.create(userToCreate))
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