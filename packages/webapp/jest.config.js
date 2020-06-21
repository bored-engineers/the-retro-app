module.exports = {
    roots: ['<rootDir>/src'],
    "setupFiles": [
      "react-app-polyfill/jsdom"
    ],
    "setupFilesAfterEnv": [
      "<rootDir>/src/setupTests.ts"
    ],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts"
    ],
    modulePaths: [],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "../../node_modules/babel-jest",
      "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
      "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
    },
    testEnvironment: "jest-environment-jsdom-fourteen",    
    moduleNameMapper: {
      "^react-native$": "react-native-web",
      "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
    },
    transformIgnorePatterns: [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
      "^.+\\.module\\.(css|sass|scss)$"
    ],
    testMatch: [
      "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'node']
    // watchPlugins: [
    //   "jest-watch-typeahead/filename",
    //   "jest-watch-typeahead/testname"
    // ]
  }