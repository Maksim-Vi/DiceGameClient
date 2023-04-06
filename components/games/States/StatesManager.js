import Signal from "../Events/Signal";
import Dispatcher from "../Events/Dispatcher";

export default class StatesManager {
    constructor(statesConfig) {
        this._statesConfig = null;
        this._states = {};
        this._currentState = null;

        this._stateWillStartSignal = new Signal();
        this._statesConfig = statesConfig;

        this.init();
    }

    init() {
        let entry = null;
        this._statesConfig.forEach((stateData) => {
            if (!this._states[stateData.name]) {
                let stateInstance = new stateData.class(stateData);
                stateInstance.add(this.onStateCallback, this);
                this._states[stateData.name] = stateInstance;

                if (stateData.entry) {
                    entry = stateInstance;
                }
            }
        });
        entry.start();
    }

    getStateDataByName(stateName) {
        return this._statesConfig.find((data) => {
            return data.name === stateName;
        });
    }

    onStateCallback(data) {
        switch (data.event) {
            case 'start':
                // console.log('==> state start', data.name);
                this._currentState = this._states[data.name];
                Dispatcher.dispatch('stateManager:stateChanged', data.name);
                Dispatcher.dispatch('stateStart:' + data.name, null);
                break;
            case 'stop':
            case 'complete':
                Dispatcher.dispatch('stateManager:stateComplete', data.name);
                Dispatcher.dispatch('stateEnd:' + data.name, null);
                this.onStateFinish(data);
                break;
            default:

                break;
        }
    }

    onStateFinish(data) {
        let stateData = this.getStateDataByName(data.name);
        if (stateData) {
            if (this.nextStateName) {
                let nextStateName = this.nextStateName;
                this.nextStateName = null;
                this.stateWillStartSignal.dispatch(nextStateName);
                this._states[nextStateName].start();
            } else {
                let transitions = this.getTransition(stateData, data.params);
                if (transitions) {
                    this.stateWillStartSignal.dispatch(transitions.to);
                    this._states[transitions.to].start();
                }
            }
        }
    }

    getTransition(stateData, params) {
        for (let i = 0; i < stateData.transitions.length; i++) {
            let transition = stateData.transitions[i];
            if (transition.condition(params)) {
                return transition;
            }
        }
    }

    goToNextState() {
        this.currentState.stop();
    }

    goToState(stateName) {
        this.nextStateName = stateName;
        this.currentState.stop();
        this.nextStateName = null;
    }

    destroy(params) {
        for (let param in this._states) {
            if(this._states.hasOwnProperty(param)) {
                this._states[param].destroy(params);
            }
        }
        this._states = null;
        this._statesConfig = null;
        this._states = null;
        this._currentState = null;
        this._stateWillStartSignal = null;
        this._statesConfig = null;
    }

    get currentState() {
        return this._currentState;
    }

    get stateWillStartSignal() {
        return this._stateWillStartSignal;
    }
}
