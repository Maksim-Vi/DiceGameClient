export default new class GlobalDispatcher {
    constructor() {
        this._listeners = [];
        this._eventsStack = [];
        this._inProgress = false;
    }

    get listeners() {
        return this._listeners;
    }

    get eventsStack() {
        return this._eventsStack;
    }

    set inProgress(value) {
        this._inProgress = value;
    }

    get inProgress() {
        return this._inProgress;
    }

    add($event, $callback, $context, $priority) {
        let listener = {event: $event, callback: $callback, context: $context, priority: $priority || 1, once: false};
        this.addToListeners(listener);
    }

    addOnce($event, $callback, $context, $priority) {
        let listener = {event: $event, callback: $callback, context: $context, priority: $priority || 1, once: true};
        this.addToListeners(listener);
    }

    addToListeners($listener) {
        if (!this.listeners[$listener.event]) {
            this.listeners[$listener.event] = [];
        }
        this.listeners[$listener.event].push($listener);
        this.listeners[$listener.event].sort(function (a, b) {
            return b.priority - a.priority;
        });
    }

    dispatch($event, $params, $callback) {
        this.eventsStack.push({event: $event, params: $params, callback: $callback || null});
        if (!this.inProgress) {
            this.executeFromStack();
        }
    }

    remove($event, $callback) {
        if(this.listeners && this.listeners[$event]){
            this.listeners[$event].forEach((listener, index, array) => {
                if (listener.event === $event && listener.callback === $callback) {
                    array.splice(index, 1);
                }
            });
        }
    }

    removeAll($event) {
        for (let listener in this.listeners) {
            if (this.listeners.hasOwnProperty(listener)) {
                this.listeners[listener].forEach((listener, index, array) => {
                    if (listener.event === $event) {
                        array.splice(index, 1);
                    }
                });
            }
        }
    }

    executeFromStack() {
        this.inProgress = true;
        let object = null;
        while (this.eventsStack.length > 0) {
            object = this.eventsStack.shift();
            this.execute(object);
        }
        this.inProgress = false;
    }

    execute(object) {
        let param = null;
        if (this.listeners.hasOwnProperty(object.event)) {
            for (let i = 0; i < this.listeners[object.event].length; i++) {
                let listener = this.listeners[object.event][i];
                if (listener.channel !== object.channel) {
                    continue;
                }

                param = {type: object.event, params: object.params, callback: object.callback};
                if (listener.context) {
                    listener.callback.call(listener.context, param);
                } else {
                    listener.callback(param);
                }
                if (listener.once) {
                    this.listeners[object.event].splice(i, 1);
                    i--;
                }
            }
        }
    }
}()
