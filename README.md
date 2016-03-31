# scheme-validator

Simple lib for object validation bu scheme for node.js

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
        required : true  // requiredField,
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
