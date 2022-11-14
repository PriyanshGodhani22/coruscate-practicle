// const jwt = require('jsonwebtoken');
const {  user } = require('../model');




exports.updateUser = async (req,res)=>{
    let filter = { id: req.body.id};
    let doc = JSON.parse(req.body.doc);
    let updateDoc = {
        $set: doc
    };
    let result;
    try {
       user.updateOne(filter, updateDoc).exec(async (err,response)=> {
        if(err){
            res.send()
        }else{
            result = response;
            res.send(result);
        }
       });
    } catch (error) {
        res.status(500).send(error);
    } finally {
        
    }
};