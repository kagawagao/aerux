module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: [],
  testRegex: '/test/.+\\.spec\\.tsx?$',
  moduleDirectories: ['node_modules', '<rootDir>', '<rootDir>/src'],
  globals: {
    NODE_ENV: 'test',
    'ts-jest': {
      diagnostics: false
    }
  }
}
