const express = require('express');
const { updateUser } = require('../contollers/updateUser');
const {verifyToken} = require('../middleware/auth');
const router= express.Router();


router.post('/',verifyToken,updateUser);




module.exports= router;