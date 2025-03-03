const repository = require('./repository');

exports.user=async(req,res)=>{

    
    const user = repository.user(user_id);

    res.json(user);
}