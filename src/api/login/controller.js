const jwt = require('jsonwebtoken');
const repository = require('./repository');
const bcrypt = require('bcryptjs');

exports.login= async (req,res)=>{
    try{
        const {user_id,password}=req.body;

        //유저 조회
        const [users] = await repository.searchid(user_id);
        // users를 []로 감싸는 이유는 배열인 값이 올 때 첫번째 값을 users에 할당 하기 위해서 [] 감싼다
        if(users.length===0){
            return res.status(400).json({message:"아이디가 존재하지 않습니다."});
        }
        
        // const user = users;

        //비밀번호 검증
        const isMatch = await bcrypt.compare(password,users.password);
        if(!isMatch) return res.status(400).json({message:"비밀번호가 일치 하지 않습니다."});

        //JWT 발급
        const accessToken = jwt.sign({user_id:users.user_id,password:password},process.env.SECRETKEY,{expiresIn:'15m'});
        const refreshToken = jwt.sign({user_id:users.user_id},process.env.SECRETKEY,{expiresIn:'7d'});

        // Refresh Token을 쿠키에 저장
        res.cookie("refreshToken",refreshToken,{httpOnly:true,secure:false});
        res.json(accessToken);
    }catch(err){
        res.status(500).json({message:"서버 오류"});
    }
}

exports.logout= async(req,res)=>{
    res.clearCookie("refreshToken");
    res.json({message:"로그아웃 성공"});
}