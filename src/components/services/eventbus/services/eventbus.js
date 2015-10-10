export default class EventBus {
    constructor() {
        EventBus.eventMap = new Map();
    }

    on (eventType, handler) {
        //multiple event listener
        if (!EventBus.eventMap.has(eventType)) {
            EventBus.eventMap.set(eventType, []);
        }
        EventBus.eventMap[eventType].push(handler);
    }

    off (eventType, handler) {
        let map = EventBus.eventMap;
        map.set(eventType, map.get(eventType).filter(it => it === handler));
    }

    fire (event) {
        let eventType = event.type;
        let arr = EventBus.eventMap.get(eventType);
        arr || arr.forEach(it => it(event));
    }
}