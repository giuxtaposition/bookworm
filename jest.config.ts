import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
        '^.+\\.cjs$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/__tests__/__mocks__/fileMock.ts',
    },
    moduleDirectories: ['node_modules', 'src/__tests__/utils'],
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/__tests__/utils/setupTests.ts'],
    testPathIgnorePatterns: [
        'src/__tests__/utils',
        'src/__tests__/__mocks__',
        'cypress/tests',
    ],
}

export default config
