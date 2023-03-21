import State from "../State";
import Dispatcher from "../../Events/Dispatcher";

export default class MaxScoresUsersState extends State {
    addListeners() {
        super.addListeners();
        Dispatcher.add('model:updateMaxScores', this.onUpdateMaxScores, this);

    }

    onUpdateMaxScores() {
        if (this.active) {
            this.complete();
        }
    }

    destroy(params) {
        super.destroy(params);
        Dispatcher.remove('model:updateMaxScores', this.onUpdateMaxScores);
    }
}
