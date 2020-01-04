
const validator = require('validator');
const isEmpty = require("is-empty");

module.exports = function validateLogin(data) {
    let errors = {};
  
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";

    if (!validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
    
    if (validator.isEmpty(data.email)) {
      errors.email = "Email field is required";
    }
  
    if (validator.isEmpty(data.password)) {
      errors.password = "Password field is required";
    }
  
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password must be at least 6 characters";
    }

    // if (data.phone.length != 10) {
    //     errors.phone = "Name must be 10 characters";
    // }
    
    // if (validator.isEmpty(data.phone)) {
    //     errors.phone = "Name field is required";
    // }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };