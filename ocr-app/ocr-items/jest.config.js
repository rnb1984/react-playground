process.env.TZ = 'UTC';
module.exports = {
    transform: {
      "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    testPathIgnorePatterns: ["<rootDir>/lib/", "<rootDir>/node_modules/"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    snapshotSerializers: [
      "enzyme-to-json/serializer"
    ],
    setupFiles: [
      "<rootDir>/setupTests.js"
    ],
    "globals": {
      "ts-jest": {
        "tsConfig": "tsconfig.jest.json"
      }
    },
    "moduleNameMapper": {
      "\\.(css|jpg|png|svg)$": "<rootDir>/empty-module.ts"
    }
};