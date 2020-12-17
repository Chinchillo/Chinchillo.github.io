const ignore = [
    "<rootDir>/src/data",
    "<rootDir>/test/empty-module.js",
    "/node_modules/"
]

module.exports = {
    "testRegex": "((\\.|/*.)(test))\\.js?$",
    "modulePathIgnorePatterns": ignore,
    "coveragePathIgnorePatterns": ignore,
    "moduleNameMapper": {
        "\\.(css|jpg|png)$": "<rootDir>/test/empty-module.js"
    }
}
