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
            { to: 'throwResultState', condition: function (data) {
                    return data === 'throwResult';
                }
            },
            { to: 'restoreGameState', condition: function (data) {
                    return data === 'restoreGame';
                }
            },
        ]
    },
    { name: 'throwResultState', class: ThrowResultState, transitions: [
            { to: 'boardResultState', condition: function (data) {
                    return data === 'boardResult';
                }
            },
            { to: 'restoreGameState', condition: function (data) {
                    return data === 'restoreGame';
                }
            },
        ]
    },
    { name: 'boardResultState', class: BoardResultState, transitions: [
            { to: 'maxScoresUsersState', condition: function (data) {
                    return data === 'maxScoresUsers';
                }
            },
            { to: 'restoreGameState', condition: function (data) {
                    return data === 'restoreGame';
                }
            },
        ]
    },
    { name: 'maxScoresUsersState', class: MaxScoresUsersState, transitions: [
            { to: 'idleState', condition: function (data) {
                    return data === 'idle';
                }
            },
            { to: 'restoreGameState', condition: function (data) {
                    return data === 'restoreGame';
                }
            },
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
