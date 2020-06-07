const mongoose = require('mongoose')
const User = require('./user')

const product = new mongoose.Schema({
name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 15
  },
description: {
    type: String,
    minlength: 10,
    maxlength: 150
  },
image: {
    type: String,
    default: "./images/default.jpg"
},
price: {
    type: Number,
    required: true,
    set: function(v) { return v.toFixed(2);},
    min: 1,
    max: 1000
},
quantity:{
    type: Number,
    default: 1,
    min: 1,
    max: 10
},
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
}
}, {timestamps: true})

product.post('save', async function() {
    user = await User.findOne({ _id: this.user })
    user.products.push(this._id);
    user.save()
  });

product.pre('deleteOne', async function() {
    const docToDelete = await this.model.findOne(this.getQuery())
    if(docToDelete){
    user = await User.findOne({ _id: docToDelete.user })
    index = user.products.indexOf(docToDelete._id);
    if (index !== -1) user.products.splice(index, 1);
    user.save()
    }
  });


module.exports = mongoose.model('product', product)