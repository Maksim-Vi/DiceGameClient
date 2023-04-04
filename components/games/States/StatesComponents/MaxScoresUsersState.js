import State from "../State";
import Dispatcher from "../../Events/Dispatcher";

export default class MaxScoresUsersState extends State {
    addListeners() {
        super.addListeners();
        Dispatcher.add('model:updateMaxScores', this.onUpdateMaxScores, this);
        Dispatcher.add('app:restoreGameLoadResources', this.onRestoreGame, this);
    }

    onRestoreGame() {
        if (this.active) {
            this.complete('restoreGame');
        }
    }

    onUpdateMaxScores() {
        if (this.active) {
            this.complete('idle');
        }
    }

    destroy(params) {
        super.destroy(params);
        Dispatcher.remove('model:updateMaxScores', this.onUpdateMaxScores);
        Dispatcher.remove('app:restoreGameLoadResources', this.onRestoreGame);
    }
}
