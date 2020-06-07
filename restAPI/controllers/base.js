class BaseController {
    constructor(model) {
        this.model = model;
    }
    findAll() {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.model.find({}).lean().exec())
            } catch (e) {
                reject(false)
            }
    
        })
    }
    findPaginate(limit, offset) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.model.find({}).limit(parseInt(limit)).skip(parseInt(offset)).exec())
            } catch (e) {
                reject(false)
            }
    
        })
    }
    create(colletionToCreate) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.model.create(colletionToCreate))
            } catch (e) {
                reject(false)
            }   
        })
    }
    update(query, colletionToUpdate){
        // update funkcije moongosa ne pokrecu middlewere, izvrasavaju se direktnu u bazi
        return new Promise((resolve, reject) => {
            try {
                resolve(this.model.findOneAndUpdate(query, colletionToUpdate, {new: true , runValidators: true}))
            } catch (e) {
                reject(false)
            }   
        })
    }
    delete(query){
        return new Promise((resolve, reject) => {
            try {
                resolve(this.model.deleteOne(query))
            } catch (e) {
                reject(false)
            }   
        })
    }
    findOne(query) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.model.findOne(query))
            } catch (e) {
                reject(false)
            }
        })
    }
    findMany(query) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.model.find(query))
            } catch (e) {
                reject(false)
            }
        })
    }
  }

module.exports = BaseController