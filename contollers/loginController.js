const jwt = require('jsonwebtoken');
const { user } = require('../model');




exports.loginReq = async (req, res) => {
    let clientQuery = {
        userName:req.body.userName,
        password:req.body.password
    }
    user.find( {userName : clientQuery.userName}).sort({userName : 1}).exec( async (err, result) =>{
        if (err) { res.send(err) };
        let _isLoggedIn = false;
        let token = "";
        let data = [];  
        if ((result.length != 0) && (result[0].password == clientQuery.password) ) {
            _isLoggedIn = true;
            token = jwt.sign(
                { userName: clientQuery.userName, password: clientQuery.password },
                "123@456",
                { expiresIn: 1800 }
            );
            data = {
                email: result[0].email,
                gender: result[0].gender,
                id:result[0].id,
                name: result[0].name,
                password: result[0].password,
                phone: result[0].phone,
                role: result[0].role,
                userName: result[0].userName,
            }
        } else {
            _isLoggedIn = false
        }
     
        let response = {
            data: JSON.parse(JSON.stringify(data)),
            _isLoggedIn: _isLoggedIn,
            authToken: token,
            _isVerified: true
        }
        res.send(response);
    });
};