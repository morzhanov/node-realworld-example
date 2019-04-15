const jsTransformer = require('babel-jest').createTransformer({
  presets: ['@babel/preset-react', '@babel/preset-env'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    'dynamic-import-node-babel-7',
    'require-context-hook',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true
      }
    ]
  ]
})

module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  testRegex: '(/tests/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  transformIgnorePatterns: ['node_modules'],
  globals: {
    window: true
  },
  setupFiles: ['jest-localstorage-mock', '<rootDir>/config/jest/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|styl)$': 'identity-obj-proxy',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'test-file-stub'
  },
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/config/jest/js.transformer.js'
  }
}
