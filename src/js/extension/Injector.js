import storage from "../util/storage";
import defaultProperties from "../options/propertyDefaults";

const inject = (tabID, css) => {
    chrome.tabs.insertCSS(tabID, { code: css.stringify(), allFrames: true });
};

export default { inject };