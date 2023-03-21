import Signal from "../Events/Signal";

export default class State extends Signal {
    constructor(stateData) {
        super();

        this.stateData = stateData;
        this.active = false;

        this.init();
        this.addListeners();
    }

    init() {

    }

    addListeners() {

    }

    start() {
        this.active = true;
        this.dispatch({event: 'start', name: this.stateData.name});
    }

    stop(params) {
        this.active = false;
        this.dispatch({event: 'stop', name: this.stateData.name, params: params/*, to:transition.to*/});
        this.onEnd();
    }

    complete(params) {
        this.active = false;
        this.dispatch({event: 'complete', name: this.stateData.name, params: params/*, to:transition.to*/});
        this.onEnd();
    }

    onEnd() {}

    destroy(params) {
        this.removeAll();
    }
}
