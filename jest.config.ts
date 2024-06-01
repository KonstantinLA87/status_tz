import { Config } from '@jest/types'

const config: Config.InitialOptions = {
    automock: true,
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        'src/**/*.{ts,tsx}',
        '!vendor/**/*.(js,jsx)',
        '!**/node_modules/**',
    ],
    coverageProvider: 'babel',
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 50,
            lines: 50,
            statements: 50,
        }
    },
    maxConcurrency: 5,
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
};

export default config;