const swcConfig = {
  jsc: {
    parser: { syntax: "typescript", decorators: true },
    transform: { legacyDecorator: true, decoratorMetadata: true },
  },
}
const config = {
  transform: {
    ".(ts|tsx)$": ["@swc/jest", swcConfig],
    ".(js|jsx)$": ["@swc/jest", swcConfig],
  },
  transformIgnorePatterns: [],//["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  rootDir: "../../../",
  moduleNameMapper: {
    "^uuid$": "uuid",
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  // coverageDirectory: "<rootDir>/coverage/",
  // collectCoverageFrom: ["<rootDir>/packages/*/src/**/*.{ts,tsx}"],
  moduleDirectories: ["<rootDir>/node_modules"],
  globals: {
    window: undefined,
  },
  setupFiles: ["<rootDir>/src/lib/__test__/jest.env.js"],
  setupFilesAfterEnv: ["<rootDir>/src/lib/__test__/jest.setup.js"],
  testMatch: [
    "<rootDir>/src/lib/__test__/**/*.test.ts"
  ]
}

module.exports = config