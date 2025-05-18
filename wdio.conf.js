export const config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        // ToDo: define location for spec files here
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    maxInstances: 10,
    capabilities: (function () {
        const browser = process.env.BROWSER || 'chrome';
        return [{
            maxInstances: 1,
            browserName: browser
        }];
    })(),
    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    // baseUrl: 'http://localhost:8080',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    // services: [],
    framework: 'mocha',
    // specFileRetries: 1,
    // specFileRetriesDelay: 0,
    // specFileRetriesDeferred: false,
    reporters: [
    ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }],
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    // =====
    // Hooks
    // =====
    // Uncomment and add your hooks if needed
    // onPrepare(config, capabilities) {},
    // onWorkerStart(cid, caps, specs, args, execArgv) {},
    // onWorkerEnd(cid, exitCode, specs, retries) {},
    // beforeSession(config, capabilities, specs, cid) {},
    // before(capabilities, specs) {},
    // beforeCommand(commandName, args) {},
    // beforeSuite(suite) {},
    // beforeTest(test, context) {},
    // beforeHook(test, context, hookName) {},
    // afterHook(test, context, { error, result, duration, passed, retries }, hookName) {},
    // afterTest(test, context, { error, result, duration, passed, retries }) {},
    // afterSuite(suite) {},
    // afterCommand(commandName, args, result, error) {},
    // after(result, capabilities, specs) {},
    // afterSession(config, capabilities, specs) {},
    // onComplete(exitCode, config, capabilities, results) {},
    // onReload(oldSessionId, newSessionId) {},
    // beforeAssertion(params) {},
    // afterAssertion(params) {},
};