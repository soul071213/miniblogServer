const {pool} = require('../../database');

exports.add=async(title,detail)=>{
    const query=`insert into board (title,detail) values(?,?)`;
    return await pool.query(query,[title,detail]);
}

exports.list=async()=>{
    const query=`select * from board`;
    return await pool.query(query);
}

exports.detail=async(id)=>{
    const query = `select * from board where id=?`;
    return await pool.query(query,[id]);
}