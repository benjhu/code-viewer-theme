import Injector from "./Injector";
import stringify from "./stringify";
import propertySets from "Shared/property-sets/exports";
import { matchUrl } from "../util/utils";

chrome.tabs.onUpdated.addListener((tabID, info, tab) => {
    if (info.status !== "complete")
        return;

    const match = propertySets.find(propertySet =>
        propertySet.url ? matchUrl(tab.url, propertySet.url, false, false) : false);

    if (match)
        stringify(match.name).then(str => Injector.inject(tabID, str));
});