export default class Signal {
    constructor() {
        this.callbacks = []
    }

    add(callback, context) {
        let object = {callback: callback, context: context, once: false};
        this.callbacks.push(object)
    }

    addOnce(callback, context) {
        let object = {callback: callback, context: context, once: true};
        this.callbacks.push(object)
    }

    dispatch(params) {
        this.callbacks.forEach((item) => {
            if (item.context) {
                item.callback.call(item.context, params);
            } else {
                item.callback(params);
            }

            if (item.once) {
                this.remove(item.callback)
            }
        })
    }

    remove(callback) {
        let index = this.callbacks.findIndex((item) => {
            return item.callback === callback
        });

        if (index !== -1) {
            this.callbacks.splice(index, 1)
        }
    }

    removeAll() {
        this.callbacks = [];
    }
}
