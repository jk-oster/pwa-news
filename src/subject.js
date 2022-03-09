/**
 * Registers different events and can:
 * - subscribe observers
 * - unsubscribe observers
 * - notify observers about a triggered event
 */
export default class Subject {
    #observers; // Assoziativer Array

    constructor() {
        this.#observers = [];
    }

    /**
     * Adds a specified object and function to the observer list
     * @param event to be subscribed
     * @param subscriber to be added
     * @param callbackFunction to be called on event
     */
    subscribe(event, subscriber, callbackFunction) {
        if (!this.#observers[event]) {
            this.#observers[event] = [];
        }
        this.#observers[event].push({
            obj: subscriber,
            fct: callbackFunction
        });
        console.log(this.#observers);
    }

    /**
     * Removes a specified object and function from the observer list
     * @param event to be unsubscribed from
     * @param subscriber to be removed
     * @param callbackFunction to be removed
     */
    unsubscribe(event, subscriber, callbackFunction) {
        if (this.#observers[event]) {
            this.#observers[event] = this.#observers[event].filter(e => {
                if (e.fct !== callbackFunction && e.obj !== subscriber)
                    return e;
            });
        } else throw new Error('Event does not exist');
    }

    /**
     * Triggers the specified event a calls all subscribed observer functions
     * @param event to be triggered
     * @param paramObj to be passed for the subscriber functions to process
     */
    notify(event, paramObj) {
        if (this.#observers[event]) {
            for (let sub of this.#observers[event]) {
                sub.fct.call(sub.obj, paramObj);
            }
        } else throw new Error('Event does not exist');
    }
}