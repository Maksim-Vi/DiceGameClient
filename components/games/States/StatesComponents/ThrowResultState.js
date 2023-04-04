import State from "../State";
import Dispatcher from "../../Events/Dispatcher";

export default class ThrowResultState extends State {
    addListeners() {
        super.addListeners();
        Dispatcher.add('message:setThrowResult', this.onThrowResult, this);
        Dispatcher.add('app:restoreGameLoadResources', this.onRestoreGame, this);
    }

    onRestoreGame() {
        if (this.active) {
            this.complete('restoreGame');
        }
    }

    onThrowResult() {
        if (this.active) {
            this.complete('boardResult');
        }
    }

    destroy(params) {
        super.destroy(params);
        Dispatcher.remove('message:setThrowResult', this.onThrow);
        Dispatcher.remove('app:restoreGameLoadResources', this.onRestoreGame);
    }
}
