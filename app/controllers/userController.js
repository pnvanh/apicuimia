const User = require('../models/userModel'); 
const bcrypt = require('bcrypt')
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");

//import validator
const validatorRegister = require('../validators/validation');
const validationLogin = require('../validators/validationLogin');


module.exports.register = async (req, res) => {
  const { errors, isValid } = validatorRegister(req.body);

  //Check value request validation cho nó
  if (!isValid) {
    return res.status(401).json({
      success: false,
      message: errors
    });
  }
  //console.log(req.body);
  const { phone, email, firstName, lastName, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(401).json({
      success: false,
      message: "Email is already taken"
    });
  } else {
    //hash and save new user
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);
    let newUser = {
      email: email,
      phone: phone,
      firstName: firstName,
      lastName: lastName,
      password: hashPassword,
      avatar: "public/uploads/avatar/avt.jpg"
    };

    let status = await User.create(newUser);

    return res.json({
      success: !!status,
      message: "User has been created"
    });
  }
};

//login ở đây nè
module.exports.login = async (req, res) => {
  const { errors, isValid } = validationLogin(req.body);

  //Check value request
  if (!isValid) {
    return res.status(401).json({
      success: false,
      message: errors
    });
  }

  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Sorry, this account does not exits"
    });
  } else {

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const payload = {
        id: user._id,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar
      };
      //tao token sau khi đăng nhập nè
      console.log(process.env.SECURITY_KEY_TOKEN);
      let token = jsonwebtoken.sign(payload, process.env.SECURITY_KEY_TOKEN, {
        expiresIn: '10' // cho nó sống 10 ngày
      });

      return res.json({ success: true, token:token, user: user });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password incorrect"
      });
    }
  }
};

module.exports.avatar = async (req, res) =>{
    const id = req.params.id;
    const imageBase64 = req.body.image;
    const imagePath = "uploads/avatar/"+Date.now() + "-"+req.body.name+ ".jpeg"
    const nameImage = "public/uploads/avatar/"+Date.now() + "-"+req.body.name+ ".jpeg";
    require("fs").writeFile(nameImage, imageBase64, 'base64', function(err) {
      console.log("erorr"+err);
    });
    if (nameImage != undefined){
      let userAvatar = {
            avatar: imagePath,
      };
      let updateUser = await User.updateOne({ _id: id }, userAvatar);
      if (updateUser.n === 0) {
        return res.status(401).json({ success: false, message: "Update failed" });
      }
    }
    return res.json({
      success: true,
      message: "Save avatar successfully!",

    });
}
