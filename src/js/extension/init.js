import Injector from "./Injector";
import stringify from "./stringify";
import propertySets from "./property-sets/exports";
import { matchUrl } from "../util/utils";

chrome.tabs.onUpdated.addListener((tabID, info, tab) => {
    if (info.status !== "complete")
        return;

    const match = propertySets.find(propertySet => matchUrl(tab.url, propertySet.url, false, false));

    if (match)
        Injector.inject(tabID, stringify(match.name));
});