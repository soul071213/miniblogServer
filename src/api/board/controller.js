const repository = require('./repository')

exports.adds = async (req, res) => {
    try {
        const { title, detail } = req.body;

        // title과 detail이 정상적으로 전달되었는지 로그 출력
        console.log("Received title:", title);
        console.log("Received detail:", detail);

        // 필수 값 확인 (유효성 검사)
        if (!title || !detail) {
            return res.status(400).json({ message: "Title and detail are required" });
        }

        // DB에 추가
        const result = await repository.add(title, detail);

        res.status(201).json({
            message: "Board added successfully",
            data: result
        });
    } catch (error) {
        console.error("Error adding board:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.add=async(req,res)=>{
    const {title,detail}=req.body;

    const result = await repository.add(title, detail);

    res.json({
        data:result
    });
}

exports.list=async(req,res)=>{
    const commentList = await repository.list();

    res.json(commentList);
}

exports.detail=async(req,res)=>{
    const {id}=req.body;

    const detailList = await repository.detail(id);

    res.json(detailList);
}