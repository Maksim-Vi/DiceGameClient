import images from "../../assets/dynamicLoadImage";
import {selectMyUser} from "../redux/reducers/players/PlayersReducer";
import {store} from "../redux/redux-store";

export const getCollectionDiceImg = (id) => {
    let diceUrl = null

   try {
        if(id){
            diceUrl = images.dices[id]
       }
   } catch (e){
       console.error('cannot loaded dice by name, set default')
       diceUrl = images.dices.default
   }

   return diceUrl
}

export const getCollectionSquareImg = (id) => {
    let squareUrl = null

   try {
        if(id){
            squareUrl = images.squares[id]
       }
   } catch (e){
       console.error('cannot loaded dice by name, set default')
       squareUrl = images.squares['1']
   }

   return squareUrl
}

export const getResultScreenData = () =>{
    const myUser = selectMyUser(store.getState())
    return  {
        gameId: 13234241,
        players: [
        {id: myUser.id, username: myUser.username, avatar: myUser.avatar, side: 0, activeItems: 0, inGame: true},
        {id: 66, username: 'Tetris', avatar: 5, side: 1, activeItems: 0, inGame: true}
        ],
        userResultItems:{
            scores: 30,
            coins: 3,
            crystals: 1,
        },
        opponentResultItems:{
        scores: 50,
        coins: 0,
        crystals: 0,
        },
        userWin: false,
        opponentWin: true
    }
}

export const getStartGameData = () =>{
    return  {
        isStarted:true,
        gameSettings:{
            gameId:"70aa11c2-1e15-4a0f-892e-c85585e6c47a",
            isStarted:true,
            maxPlayers:2,
            countPlayers:2,
            bot:true,
            players:[
                {
                    id:123456789,
                    username:"Bot",
                    avatar:3,
                    inGame:true,
                    side:1
                },
                {
                    id:6,
                    username:"Max",
                    avatar: "3",
                    side:2,
                    activeItems:{
                        dice:2,
                        square:11
                    },
                    inGame:true
                }
            ],
            table:{row:3,column:3},
            gameTime:360
        },
        gameData:{
            player1:[0,0,0,0,0,0,0,0,0],
            player2:[0,0,0,0,0,0,0,0,0]
        }
    } 
}

export const getCurrentData = () =>{
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    return dd + '.' + mm  + '.' + yyyy;
}

