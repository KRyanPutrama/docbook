module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': 0,
    semi: ['error', 'never'],
    '@typescript-eslint/indent': ['warn', 2, {
      VariableDeclarator: { var: 2, let: 2, const: 3 },
      SwitchCase: 1,
    }],
    'react-hooks/exhaustive-deps': 0,
    'react-native/no-inline-styles': 0,
    'curly': 'off',
  },
}
