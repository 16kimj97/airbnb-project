module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    overrides: [
        {
          files: [
            "src/context/*.jsx"
          ],
          rules: {
            'react-refresh/only-export-components': 'off'
          }
        }
       ],
           "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
}
