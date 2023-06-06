const events = new Map();
export default {
    $on(eventName, fn) {
        if (!events.has(eventName)) {
            events.set(eventName, []);
        }
        events.get(eventName).push(fn);
    },
    $off(eventName) {
        if (events.has(eventName)) {
            events.get(eventName).delete(eventName);
        }
    },
    $emit(eventName, data) {
        if (events.has(eventName)) {
            events.get(eventName).forEach(fn => fn(data));
        }
    }
}