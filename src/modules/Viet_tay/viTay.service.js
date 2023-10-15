const viTayRepo = require('./viTay.repository');

const getAll = async () => {
    const allWord = await viTayRepo.getAllVietTay();
    const dataAllWord = allWord.map((value) => {
        return {
            viet: value.idVi.word,
            tay: value.idTay.word,
            dacdiem: value.idTay.description,
        };
    });
    return dataAllWord;
};

const translate = async (word, language) => {
    const words = await viTayRepo.translate(word, language);
    if (words.length === 0) {
        return word;
    }
    if (language === 'tay') {
        return words.map((value) => value.idVi.word);
    }
    return words.map((value) => value.idTay.word);
};
module.exports = {
    translate,
    getAll,
};
