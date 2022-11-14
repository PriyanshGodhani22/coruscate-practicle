const express = require('express');
const { signUP } = require('../contollers/signUp');
const router= express.Router();


router.post('/',signUP);




module.exports= router;