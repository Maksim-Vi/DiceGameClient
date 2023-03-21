import State from "../State";
import Dispatcher from "../../Events/Dispatcher";
import GameModel from "../../GameModel/GameModel";

export default class IdleState extends State {
    addListeners() {
        super.addListeners();
        Dispatcher.add('model:startUserThrow', this.onUserThrow, this);
        Dispatcher.add('model:startOpponentThrow', this.onOpponentThrow, this);
        Dispatcher.add('app:restoreGameLoadResources', this.onRestoreGame, this);

    }

    onUserThrow() {
        if (this.active) {
            this.complete('throw');
        }
    }

    onOpponentThrow() {
        if (this.active) {
            this.complete('throw');
        }
    }

    onRestoreGame() {
        if (this.active) {
            this.complete('restoreGame');
        }
    }

    destroy(params) {
        super.destroy(params);
        Dispatcher.remove('app:gameStarted', this.start);
        Dispatcher.remove('model:startUserThrow', this.onUserThrow);
        Dispatcher.remove('model:startOpponentThrow', this.onOpponentThrow);
        Dispatcher.remove('app:restoreGameLoadResources', this.onRestoreGame);
    }
}
