const {pool} = require('../../database');

exports.searchid= async(user_id)=>{
    const query=`select * from user where user_id = ?`;
    return await pool.query(query,[user_id]);
}