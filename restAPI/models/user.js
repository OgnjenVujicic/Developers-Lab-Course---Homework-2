const mongoose = require('mongoose')
const crypto = require('crypto');
const jwt = require('jsonwebtoken')

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
    required: true,
    match: [new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,})"), 'Password must have atleast one capital letter and number and more then 4 chars']
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


user.pre('save', function(next) {
  if ( this.password && this.isModified('password') ) {
    this.password = crypto.createHash('sha256').update(this.password).digest('base64');
  }
  next();
});

user.pre('findOneAndUpdate', async function() {
  const docToUpdate = await this.model.findOne(this.getQuery())
  if (docToUpdate.password !== this._update.password) {
    if (!this._update.password.match(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,})"))){
      throw new Error('Password must have atleast one capital letter and number and more then 4 chars')
    }
    const newPassword = crypto.createHash('sha256').update(this._update.password).digest('base64');
    this._update.password = newPassword
  }
})

user.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({_id: user._id}, process.env.JWT_KEY,{ expiresIn: "1h" })
  return token
}

user.statics.findByCredentials = async (email, password) => {
  const check_user = await User.findOne({ email } )
  if (!check_user) {
      throw new Error('Invalid login credentials' )
  }
  const passHash = crypto.createHash('sha256').update(password).digest('base64');
  if ( passHash != check_user.password) {
      throw new Error('Invalid login credentials' )
  }
  return check_user
}

const User = mongoose.model('user', user)

module.exports = User