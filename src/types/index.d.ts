declare namespace NodeJS {
    interface Process extends NodeJS.Process {
        browser?: string
    }
}
