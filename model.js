const mongoose = require('mongoose');
const user = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
   userName : {
        type : String,
        required : true    
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['admin','user'],
        required : true
    },
    isActive : {
        type : String,
        required : true
    },
    id : {
        type : String,
        required : true
    }
});

module.exports.user = mongoose.model('user',user);