import images from "../../assets/dynamicLoadImage";

export const getCollectionDiceImg = (name) => {
    let diceUrl = null

   try {
        if(name){
            diceUrl = images.dices[name]
       }
   } catch (e){
       console.error('cannot loaded dice by name, set default')
       diceUrl = images.dices.default
   }

   return diceUrl
}

export const getCollectionSquareImg = (name) => {
    let diceUrl = null

   try {
        if(name){
            diceUrl = images.squares[name]
       }
   } catch (e){
       console.error('cannot loaded dice by name, set default')
       diceUrl = images.squares.blackLines
   }

   return diceUrl
}

