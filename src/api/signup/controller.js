const bcrypt = require('bcryptjs');
const repository = require('./repository');

exports.signUp=async (req,res)=>{
    try{
        const {user_id,password}= req.body;
        console.log(user_id);
        console.log(password);
        
        //비밀번호 해싱
        const hashPassword = await bcrypt.hash(password,10);
        await repository.signUp(user_id,hashPassword);

        res.status(201).json({message:"회원가입 성공"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"서버 오류"});
    }
}