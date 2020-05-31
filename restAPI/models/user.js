const mongoose = require('mongoose')

const user = new mongoose.Schema({
username: {
    type: String,
    required: true,
    unique: true,
    index: true,
    minlength: 3,
    maxlength: 20
  },
password: {
    type: String,
    minlength: 5,
    maxlength: 25,
    required: true
  },
email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    minlength: 5,
    maxlength: 35,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
role: {
    type: Number,
    required: true
},
products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "product"
}]
}, {timestamps: true})


module.exports = mongoose.model('user', user)