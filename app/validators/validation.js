// const User = require('../models/userModel'); 
const validator = require('validator');
const isEmpty = require("is-empty");

module.exports = function validateRegister(data) {
    let errors = {};
  
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
  
    if (data.phone.length != 10) {
      errors.phone = "Number Phone must be 10 characters";
    }

    if (validator.isEmpty(data.phone)) {
        errors.phone = "Number Phone field is required";
    }

    if (!validator.isLength(data.firstName, { min: 2, max: 30 })) {
        errors.firstName = "First Name must be between 2 and 30 characters";
    }
    if (!validator.isLength(data.lastName, { min: 2, max: 30 })) {
        errors.lastName = "Last Name must be between 2 and 30 characters";
    }

    if (validator.isEmpty(data.firstName)) {
        errors.firstName = "First Name field is required";
    }
    if (validator.isEmpty(data.lastName)) {
        errors.lastName = "Last Name field is required";
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }

  
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
  