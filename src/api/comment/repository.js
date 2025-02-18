const {pool} = require('../../database');

exports.add=async(board_id,content)=>{
    const query=`insert into comment (board_id,content) values(?,?)`;
    return await pool.query(query,[board_id,content]);
}

exports.list=async(board_id)=>{
    const query=`select * from comment where board_id = ?`;
    return await pool.query(query,[board_id]);
}