module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'linebreak-style': 'off',
    'max-classes-per-file': 'off', // default max is 1
    'react/no-unescaped-entities': 'off',
    'react/jsx-closing-tag-location': 'off',
    'max-len': [
      'error',
      { code: 120, ignoreUrls: true, ignoreRegExpLiterals: true, ignoreStrings: true, ignoreComments: true },
    ],
  },
};
