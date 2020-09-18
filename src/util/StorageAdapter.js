import m from "mithril";
import Stream from "mithril/stream";

export function useStorage(key, defaultValue = null) {
    let state = Stream(window.localStorage.getItem(key));

    if (state() === null) {
        state(defaultValue);
    }

    function onStorageChange(e) {
        if (e.storageArea === window.localStorage && e.key === key) {
            state(e.newValue);
            m.redraw();
        }
    }

    window.addEventListener("storage", onStorageChange);

    return {
        state,
        unsubscribe: () => window.removeEventListener("storage", onStorageChange),
    }
}

export function persist(channel, key, value) {
    let stored = JSON.parse(window.localStorage.getItem(channel) || "{}");

    if (value == null) {
        delete stored[key];
        window.localStorage.setItem(channel, JSON.stringify(stored));
        return;
    }

    window.localStorage.setItem(channel, JSON.stringify({
        ...stored,
        [key]: value,
    }));
}

export function usePersistence(key) {
    let { state, unsubscribe } = useStorage(key, "{}");
    let obj = state.map(v => JSON.parse(v));

    return {
        state: obj,
        unsubscribe,
        set: persist.bind(this, key),
    }
}
