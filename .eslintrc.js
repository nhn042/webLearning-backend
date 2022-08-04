module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['airbnb-base'],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        indent: off,
        console: off,
        tabs: off,
        'max-len': ['error', { code: 150 }],
    },
};
