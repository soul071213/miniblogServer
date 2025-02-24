const bcrypt = require('bcryptjs');
const repository = require('./repository');
const jwt = require('jsonwebtoken');


exports.refresh= async(req,res)=>{
    const refreshToken= req.cookies.refreshToken;
    if(!refreshToken) return res.status(401).json({message:'refresh 토큰 없음'});

    try{
        const decoded = jwt.verify(refreshToken,process.env.SECRETKEY);
        const accessToken= jwt.sign({user_id:decoded.user_id},process.env.SECRETKEY,{expiresIn:"15m"});

        res.json({accessToken});
    }catch(error){
        return res.status(403).json({message:"유효하지 않은 refresh token입니다."});
    }
}