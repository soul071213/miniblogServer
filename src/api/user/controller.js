const repository = require('./repository');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.user=async(req,res)=>{
    try{
        const {token} = req.body;

        const decoded = jwt.verify(token,process.env.SECRETKEY);
        const user = await repository.user(decoded.user_id);

        const isMatch = await bcrypt.compare(decoded.password,user[0].password);
        if(!isMatch) return res.status(400).json({message:"비밀번호가 일치 하지 않습니다."});

        res.json({user_id:user[0].user_id,password:decoded.password});
    }catch(error){
        return res.status(403).json({message:"토큰이 만료되었거나 일치 하지 않습니다."});
    }
}