import store from "../store";
import storage from "../../util/storage";
import { kebabOrSpaceToCamel as kebCam } from "../../util/utils";

const updateStorageSubscription = () => {
    const properties = store.getState().options.properties;
    const pushToStorage = {};

    properties.forEach(({ setID, property, value }) => {
        if (!pushToStorage[setID])
            pushToStorage[setID] = {};

        const destination = pushToStorage[setID];
        destination[kebCam(property)] = value;
    });

    Object.keys(pushToStorage).forEach(set =>
        storage.setProperty(set, pushToStorage[set]));
};

export default updateStorageSubscription;