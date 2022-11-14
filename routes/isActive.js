// this route will Activate and deactivate the user

const express = require('express');
const {verifyToken} = require('../middleware/auth');
const { isActivate } = require('../contollers/isActive');
const router= express.Router();


router.post('/',verifyToken,isActivate);




module.exports= router;