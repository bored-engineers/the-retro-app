  module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'node',
    testMatch: [
      '**/**/src/tests/*.ts'
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testTimeout: 300000,
    setupFilesAfterEnv: ['./config/setup.ts'],
    globals: {
      'ts-jest': {
        diagnostics: false
      }
    }
  }