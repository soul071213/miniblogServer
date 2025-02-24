const {pool} = require('../../database');

exports.signUp=async (user_id,password)=>{
    const query = `insert into user (user_id,password) values (?,?)`;
    return await pool.query(query,[user_id,password]);
}