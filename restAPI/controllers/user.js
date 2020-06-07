const User = require("../models/user");
const BaseController = require("./base")
const mail_sender = require("../helpers/mail_sender")
const { parse } = require('json2csv');
const fs = require('fs');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class UserController extends BaseController {
    constructor() { 
      super(User);
    }
    findByCredentials(email, password){
       return User.findByCredentials(email, password)
    }
    async sendMailToAdmins(file){
      const file_path = './product.csv';
      const admins = await User.find({role:1})
      const csv = parse(JSON.parse(JSON.stringify(file)));
      fs.writeFileSync(file_path, csv)
      for(let i = 0 ; i < admins.length ; i++){
        mail_sender(admins[i].email,file_path)
        await sleep(500)
      }
    }
  }

module.exports = UserController