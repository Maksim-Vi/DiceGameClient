import State from "../State";
import Dispatcher from "../../Events/Dispatcher";
import GameModel from "../../GameModel/GameModel";

export default class RestoreGameState extends State {
    start() {
        super.start()
        const state = GameModel.setGameRestore()

        if(state === 'throwState'){
            if(GameModel.isYouMove && !GameModel.restoreGameData.throwData){
                Dispatcher.dispatch('model:startUserThrow', null);
            } else if(!GameModel.isYouMove && !GameModel.restoreGameData.throwData){
                Dispatcher.dispatch('model:startOpponentThrow', null);
            }
            this.onThrowState()
        } else {
            GameModel.setThrowData(GameModel.restoreGameData.throwData)
            this.onThrowResultState()
        }
    }

    onThrowState(){
        if (this.active) {
            this.complete('throwState');
        }
    }

    onThrowResultState(){
        if (this.active) {
            this.complete('throwResultState');
        }
    }
}
