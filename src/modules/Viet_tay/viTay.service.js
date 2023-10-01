const viTayRepo = require('./viTay.repository');

const getAll = async () => {
    const allWord = await viTayRepo.getAllVietTay();
    return allWord;
}

const translate = async (word, language) => {
    const words = await viTayRepo.translate(word, language);
    console.log('words', words);
    if (words.length === 0) {
        return word;
    }
    if (language === 'tay') {
        return words.map((value) => value.idVi.word);
    }
    return words.map((value) => value.idTay.word);
}
module.exports = {
    translate,
    getAll,
};