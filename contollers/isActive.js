// const jwt = require('jsonwebtoken');
const { response } = require('express');
const {  user } = require('../model');



/* here we will be passing the flag in doc for user's activation or deactivation
which will look like

doc : {
    isActive : true
} or 

doc : {
    isActive : false
}

*/
exports.isActivate = async (req,res)=>{
    let curUserId = req.body.curUserId;
    let isAdmin = false;
    let filter = { id: req.body.userId};
    let doc = JSON.parse(req.body.doc);
    let updateDoc = {
        $set: doc
    };
    try {
        user.find( { id : curUserId }).exec( async (err, result) =>{
            if (err) { res.send(err) };
            let data = [];  
         if(result && result[0].role === 'admin'){
            isAdmin = true;
         }
         if(isAdmin){
            user.updateOne(filter, updateDoc).exec(async (err,response)=> {
                if(err){
                    res.send(err)
                }else{
    
                    let result = response;
                    res.send(result);
                }
               });
         }else{
            res.send({
                msg : "you are not authorized"
            });
         }
        });

   
    } catch (error) {
        res.status(500).send(error);
    } finally {
        
    }
};