const viTayModel = require('./viTay.module');

const translate = async (wordSearch, language) => {
    try {
        if (language === 'viet') {
            const tayWords = await viTayModel
                .find()
                .lean()
                .populate({
                    path: 'idVi',
                    match: { word: wordSearch },
                })
                .populate({
                    path: 'idTay',
                })
                .exec();
            const word = tayWords.filter((tayWord) => {
                return tayWord.idVi;
            });
            return word;
        }
        // wordSearch = `${wordSearch} `;
        const vietWords = await viTayModel
            .find()
            .lean()
            .populate({
                path: 'idTay',
                match: { word: wordSearch || `${wordSearch} ` },
            })
            .populate({
                path: 'idVi',
            })
            .exec();
        const word = vietWords.filter((vietWord) => {
            return vietWord.idTay;
        });
        return word;
    } catch (err) {
        throw err;
    }
};

const getAllVietTay = async () => {
    return await viTayModel
        .find()
        .lean()
        .populate({
            path: 'idVi',
        })
        .populate({
            path: 'idTay',
        })
        .exec();
};

const getTaytoViet = async (wordSearch) => {
    const vietWords = await viTayModel
        .find({})
        .populate({
            path: 'idTay',
            match: { word: `${wordSearch} ` },
            select: 'word',
        })
        .populate('idVi', 'word')
        .exec();
    const vietWordsSpace = await viTayModel
        .find({})
        .populate({
            path: 'idTay',
            match: { word: wordSearch },
            select: 'word',
        })
        .populate('idVi', 'word')
        .exec();
    let result = vietWords.filter((vitay) => {
        return vitay.idTay;
    });
    if (result.length === 0) {
        result = vietWordsSpace.filter((vitay) => {
            return vitay.idTay;
        });
    }
    return result;
};

const getViettoTay = async (wordSearch) => {
    const tayWords = await viTayModel
        .find({})
        .populate({
            path: 'idVi',
            match: { word: wordSearch },
            select: 'word',
        })
        .populate('idTay', 'word')
        .exec();
    return tayWords.filter((vitay) => {
        return vitay.idVi;
    });
};

module.exports = {
    translate,
    getAllVietTay,
    getTaytoViet,
    getViettoTay,
};
