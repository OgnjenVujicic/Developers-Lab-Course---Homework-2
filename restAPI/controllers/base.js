class BaseController {
    constructor(model) {
        this.model = model;
    }
    findAll() {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.model.find({}).lean().exec())
            } catch (e) {
                console.log(e);
                reject(false)
            }
    
        })
    }
    create(colletionToCreate) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.model.create(colletionToCreate))
            } catch (e) {
                console.log(e);
                reject(false)
            }
    
        })
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.model.findById(id).exec())
            } catch (e) {
                console.log(e);
                reject(false)
            }
    
        })
    }
    findByField(field) {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.model.findOne({ field }))
            } catch (e) {
                console.log(e);
                reject(false)
            }
        })
    }
  }

module.exports = BaseController