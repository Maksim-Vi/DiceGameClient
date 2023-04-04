import State from "../State";
import Dispatcher from "../../Events/Dispatcher";

export default class ThrowState extends State {
    addListeners() {
        super.addListeners();

        Dispatcher.add('model:throw', this.onThrow, this);
        Dispatcher.add('app:restoreGameLoadResources', this.onRestoreGame, this);
    }

    onRestoreGame() {
        if (this.active) {
            this.complete('restoreGame');
        }
    }

    onThrow() {
        if (this.active) {
            this.complete('throwResult');
        }
    }

    destroy(params) {
        super.destroy(params);
        Dispatcher.remove('model:throw', this.onThrow);
        Dispatcher.remove('app:restoreGameLoadResources', this.onRestoreGame);
    }
}
