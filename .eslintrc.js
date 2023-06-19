module.exports = {
    "env": {
    },
    "extends": [
        'airbnb',
        'airbnb-typescript',
    ],
    "parserOptions": {
        "project": './tsconfig.json',
    },
    "plugins": [
    ],
    "rules": {
      "max-len": ["error", { "code": 120 }]
    }
}
