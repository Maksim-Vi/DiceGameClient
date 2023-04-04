import State from "../State";
import Dispatcher from "../../Events/Dispatcher";

export default class BoardResultState extends State {
    addListeners() {
        super.addListeners();
        Dispatcher.add('model:updateBoards', this.onUpdateBoards, this);
        Dispatcher.add('app:restoreGameLoadResources', this.onRestoreGame, this);
    }

    onRestoreGame() {
        if (this.active) {
            this.complete('restoreGame');
        }
    }

    onUpdateBoards() {
        Dispatcher.dispatch('state:userBoard', null);
        Dispatcher.dispatch('state:opponentBoard', null);
        if (this.active) {
            this.complete('maxScoresUsers');
        }
    }

    destroy(params) {
        super.destroy(params);
        Dispatcher.remove('model:updateBoards', this.onUpdateBoards);
        Dispatcher.remove('state:userBoard', this.onUpdateBoards);
        Dispatcher.remove('state:opponentBoard', this.onUpdateBoards);
        Dispatcher.remove('app:restoreGameLoadResources', this.onRestoreGame);
    }
}
