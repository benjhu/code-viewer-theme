const defaultUserSettings = {
    enableConsoleMessages: true
};

/**
 * Evaluates user permissions and sends a message to console if the feature is enabled by the user.
 *
 * @param {string} message the message that will show in the console.
 * @param {boolean} warn if true, the console output will be a warning.
 */
export const toConsole = (message, warn = false) => {
    if (defaultUserSettings.enableConsoleMessages) {
        let fn = console.log;

        if (warn) fn = console.warn;

        fn(message);
    }
};