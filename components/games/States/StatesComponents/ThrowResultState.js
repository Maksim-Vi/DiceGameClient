import State from "../State";
import Dispatcher from "../../Events/Dispatcher";

export default class ThrowResultState extends State {
    addListeners() {
        super.addListeners();
        Dispatcher.add('message:setThrowResult', this.onThrowResult, this);

    }

    onThrowResult() {
        if (this.active) {
            this.complete();
        }
    }

    destroy(params) {
        super.destroy(params);
        Dispatcher.remove('message:setThrowResult', this.onThrow);
    }
}
