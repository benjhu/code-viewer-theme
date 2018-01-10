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

export const matchUrl = (url, matchPattern, matchHttp = true, exactMatch = false) => {
    const a = url.split("/");
    const b = matchPattern.split("/");

    if (exactMatch && (a.length !== b.length))
        return false;

    if (a[0] !== "https:" && a[0] !== "http:")
        return false;

    if (b[0] !== "https:" && b[0] !== "http:")
        return false;

    if (matchHttp && (a[0] !== b[0]))
        return false;

    for (let i = 1; i < a.length; i++) {
        if (!exactMatch && i == b.length - 1 && b[i] === "*")
            return true;

        if (b[i] === "*")
            continue;

        if (a[i] !== b[i])
            return false;
    }

    return true;
};