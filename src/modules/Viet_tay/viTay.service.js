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

const translateSequenceTextVietnamToTay = async (text) => {
    const arrWord = text.split(' ');
    const test = [];

    for (const value of arrWord) {
        const result = await viTayRepo.getViettoTay(value);
        test.push(result);
    }
    let result = [];
    backTrackingAlgorithm(test, arrWord.length, 0, 0, [], result);
    return {
        listSequenceText: result,
    };
};

const translateVietToTay = async (text) => {
    const arrWord = text.split(' ');
    let test = '';
    let result = [];

    for (let i = 0; i < arrWord.length; i++) {
        while (i < arrWord.length) {
            test = (await viTayRepo.getVietToTay(test))[0];
        }
    }

    backTrackingAlgorithm(test, arrWord.length, 0, 0, [], result);

    return {
        listSequenceText: result,
    };
};

const translateSequenceTextTayToVietnam = async (text) => {
    const arrWord = text.split(' ');
    const test = [];

    for (const value of arrWord) {
        const result = await viTayRepo.getTaytoViet(value);
        test.push(result);
    }
    let result = [];
    backTrackingAlgorithmTaytoViet(test, arrWord.length, 0, 0, [], result);

    return {
        listSequenceText: result,
    };
};

const getVietToTay = (word) => {
    return viTayRepo.getViettoTay(word);
};
const getTayToViet = (word) => {
    return viTayRepo.getTaytoViet(word);
};

const backTrackingAlgorithmTaytoViet = (arr, l, indexArrWord, j, x, result) => {
    for (const value of arr[j]) {
        x[indexArrWord] = value.idVi.word;
        if (indexArrWord === l - 1) {
            result.push(x.join(' '));
        } else {
            backTrackingAlgorithm(arr, l, indexArrWord + 1, j + 1, x, result);
        }
    }
};

const backTrackingAlgorithm = (arr, l, indexArrWord, j, x, result) => {
    for (const value of arr[j]) {
        x[indexArrWord] = value.idTay.word;
        if (indexArrWord === l - 1) {
            result.push(x.join(' '));
        } else {
            backTrackingAlgorithm(arr, l, indexArrWord + 1, j + 1, x, result);
        }
    }
};

module.exports = {
    translate,
    getAll,
    getVietToTay,
    getTayToViet,
    translateSequenceTextVietnamToTay,
    translateSequenceTextTayToVietnam,
};
