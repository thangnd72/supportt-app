module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': ['./components/*'],
          '@api/*': ['api/*'],
          '@navigation/*': ['navigation/*'],
          '@screens/*': ['screens/*'],
          '@store/*': ['store/*'],
          '@utils/*': ['utils/*'],
          '@locales/*': ['locales/*'],
          '@constants/*': ['constants/*'],
          '@assets/*': ['assets/*'],
          '@models/*': ['models/*'],
        },
      },
    ],
  ],
};
