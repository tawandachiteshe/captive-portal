// babel.config.js or .babelrc
module.exports = {
  presets: [
    ['next/babel', {
      'preset-env': {
        targets: {
          ie: '11'
        },
        useBuiltIns: 'entry',
        corejs: 3
      }
    }]
  ]
};

