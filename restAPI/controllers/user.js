const User = require("../models/user");
const BaseController = require("./base")

class UserController extends BaseController {
    constructor() { 
      super(User);
    }
    findByCredentials(email, password){
       return User.findByCredentials(email, password)
    }
  }

module.exports = UserController