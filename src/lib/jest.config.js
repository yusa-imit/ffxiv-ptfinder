const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: '../../',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@recoil/(.*)$': '<rootDir>/src/recoil/$1'
  },
  modulePathIgnorePatterns: ['<rootDir>/src/auth/'],
  testEnvironment: 'node',
};

module.exports = createJestConfig(customJestConfig);
