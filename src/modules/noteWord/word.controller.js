const wordSchema = require('./word.module');
const { Error } = require('../../commons/errorHandling');
const getWord = async (req, res) => {
    const {query: email} = req.query
    const allWord = await wordSchema.find({emailUser: email});
    return res.status(200).send({
        success: true,
        data: allWord,
        message: 'lay data thanh cong',
    });
}
const updateWord = async (req, res) => {
    const wordUpdate = req.body;
    const wordNew = await wordSchema.findOne({viet: wordUpdate.viet})
    if(wordNew) {
        return res.status(200).send({
            status: 500,
            success: false,
            message: 'them tu that bai',
        });
    }
    const WordSchema = new wordSchema({
        viet: wordUpdate.viet,
        tay: wordUpdate.tay,
        dokho: wordUpdate.dokho,
        dacdiem: wordUpdate.dacdiem,
        emailUser: wordUpdate.emailUser,
    });
    await WordSchema.save();
    
    return res.status(200).send({
        status: 200,
        success: true,
        message: 'them tu thanh cong',
    });
}
const deleteWord = async (req, res) => {
    const wordUpdate = req.query;
    const wordNew = await wordSchema.findOne({viet: wordUpdate.query})
    
    if(!wordNew) {
        return res.status(200).send({
            status: 500,
            success: false,
            message: 'Xóa tu that bai',
        });
    }

    await wordSchema.deleteOne({ viet: wordUpdate.query, });
    
    return res.status(200).send({
        status: 200,
        success: true,
        message: 'Xóa tu thanh cong',
    });
}
module.exports = {
    getWord,
    updateWord,
    deleteWord,
};