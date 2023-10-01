const wordSchema = require('./word.module');
const { Error } = require('../../commons/errorHandling');
const getWord = async (req, res) => {
    const allWord = await wordSchema.find();
    console.log('allWord', allWord);
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
    });
    await WordSchema.save();
    
    return res.status(200).send({
        status: 200,
        success: true,
        message: 'them tu thanh cong',
    });
}
module.exports = {
    getWord,
    updateWord,
};