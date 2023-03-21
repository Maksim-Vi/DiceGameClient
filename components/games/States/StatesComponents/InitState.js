import State from "../State";
import Dispatcher from "../../Events/Dispatcher";
import GameModel from "../../GameModel/GameModel";


export default class InitState extends State {
    addListeners() {
        super.addListeners();
        Dispatcher.add('app:gameStarted', this.onLoadBoards, this);
        Dispatcher.add('app:restoreGameStarted', this.onLoadRestoreGame, this);
    }

    onLoadBoards(){
        Dispatcher.dispatch('state:userBoard', null);
        Dispatcher.dispatch('state:opponentBoard', null);

        this.onGameStarted()
    }

    onLoadRestoreGame() {
        this.onGameStarted()
    }

    onGameStarted() {
        if (this.active) {
            this.complete();
        }
    }

    destroy(params) {
        super.destroy(params);
        Dispatcher.remove('app:gameStarted', this.onLoadBoards);
        Dispatcher.remove('app:restoreGameStarted', this.onLoadRestoreGame);
        Dispatcher.remove('state:userBoard', this.onLoadBoards);
        Dispatcher.remove('state:opponentBoard', this.onLoadBoards);
    }
}
