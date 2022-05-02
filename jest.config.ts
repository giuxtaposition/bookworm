import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
        '^.+\\.cjs$': 'babel-jest',
    },
    moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
            'identity-obj-proxy',
    },
    moduleDirectories: ['node_modules', 'src/__tests__/utils'],
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/__tests__/utils/setupTests.ts'],
    testPathIgnorePatterns: ['src/__tests__/utils'],
}

export default config
