import State from "../State";
import Dispatcher from "../../Events/Dispatcher";

export default class ThrowState extends State {
    addListeners() {
        super.addListeners();

        Dispatcher.add('model:throw', this.onThrow, this);
    }

    onThrow() {
        if (this.active) {
            this.complete();
        }
    }

    destroy(params) {
        super.destroy(params);
        Dispatcher.remove('model:throw', this.onThrow);
    }
}
