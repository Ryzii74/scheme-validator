# scheme-validator 
[![Build Status](https://travis-ci.org/Ryzii74/scheme-validator.svg?branch=master)](https://travis-ci.org/Ryzii74/scheme-validator) [![Code Climate](https://codeclimate.com/github/Ryzii74/scheme-validator/badges/gpa.svg)](https://codeclimate.com/github/Ryzii74/scheme-validator) [![Coverage Status](https://coveralls.io/repos/github/Ryzii74/scheme-validator/badge.svg?branch=master)](https://coveralls.io/github/Ryzii74/scheme-validator?branch=master)

Simple lib for object validation by scheme for node.js

## install

npm install scheme-validation

## usage

### Use scheme

```javascript
var schemeLib = require('scheme-validator');
var validationScheme = schemeLib(validators[method]);
var validationResult = validationScheme(<object scheme>).validate(data);
```

### Scheme validators

```javascript
var scheme = {
    name : {
        required : true, // requiredField,
        type : "string"  // type of string
    },
    age : {
        type : "number" // type of number
    },
    sex : {
        enum : [ "male", "female" ] //limited array of accepted values 
    },
    licenseAggrement : {
      value : true  // fixed value for parameter
    },
    version : {
        validator : (value) => { // custom function for user validation
          return !!value; 
        }
    },
    users : {
        array : { // check each element of an array on validating inner object params
            enum : [ 1, 2, 3, 4 ]
        }
    },
    address : {
        structure : { // address field is an object with some structure, that recursively validated too
            city : {
                type : "string",
                required : true
            },
            street : {
                type : "string"
            },
            houseNumber : {
                type : "number"
            }
        }
    }
}
```

If field is not required and have no value in validated data - result will be successful!


### Validation result structure

```javascript
//successfull result
var validationResult = { success : true };

//unsuccessfull result
var validationResult = { 
    success : false,
    error : {
        key : "name", // field name from scheme with validation error,
                      // "address.city" if error in strucrute (inner object)
        text : "..."  // some error text
    }
};
```
