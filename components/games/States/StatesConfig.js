import InitState from "./StatesComponents/InitState";
import IdleState from "./StatesComponents/IdleState";
import BoardResultState from "./StatesComponents/BoardResultState";
import ThrowState from "./StatesComponents/ThrowState";
import MaxScoresUsersState from "./StatesComponents/MaxScoresUsersState";
import ThrowResultState from "./StatesComponents/ThrowResultState";
import RestoreGameState from "./StatesComponents/RestoreGameState";

export const StatesConfig = [
    { name: 'initState', class: InitState, transitions: [
            { to: 'idleState', condition: function () {
                    return true;
                }
            },
     ],
     entry: true
    },
    { name: 'idleState', class: IdleState, transitions: [
            { to: 'throwState', condition: function (data) {
                    return data === 'throw';
                }
            },
            { to: 'restoreGameState', condition: function (data) {
                    return data === 'restoreGame';
                }
            },
        ]
    },
    { name: 'throwState', class: ThrowState, transitions: [
            { to: 'throwResultState', condition: function () {
                    return true;
                }
            }
        ]
    },
    { name: 'throwResultState', class: ThrowResultState, transitions: [
            { to: 'boardResultState', condition: function () {
                    return true;
                }
            }
        ]
    },
    { name: 'boardResultState', class: BoardResultState, transitions: [
            { to: 'maxScoresUsersState', condition: function () {
                    return true;
                }
            }
        ]
    },
    { name: 'maxScoresUsersState', class: MaxScoresUsersState, transitions: [
            { to: 'idleState', condition: function () {
                    return true;
                }
            }
        ]
    },
    { name: 'restoreGameState', class: RestoreGameState, transitions: [
            { to: 'throwState', condition: function (data) {
                    return data === 'throwState';
                }
            },
            { to: 'throwResultState', condition: function (data) {
                    return data === 'throwResultState';
                }
            }
        ]
    },
];
