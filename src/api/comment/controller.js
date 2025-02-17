const repository = require('./repository')

exports.add=async(req,res)=>{
    const {board_id,content}=req.body;

    const adds = await repository.add(board_id,content);

    res.send(adds);
}

exports.list=async(req,res)=>{
    const {board_id}=req.body;

    const commentList = await repository.list(board_id);

    res.json(commentList);
}