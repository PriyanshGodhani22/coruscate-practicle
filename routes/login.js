const express = require('express');
const { loginReq } = require('../contollers/loginController');
const router= express.Router();


router.post('/',loginReq);




module.exports= router;