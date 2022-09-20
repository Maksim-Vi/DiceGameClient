import images from "../../assets/dynamicLoadImage";

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
    let diceUrl = null

   try {
        if(id){
            diceUrl = images.squares[id]
       }
   } catch (e){
       console.error('cannot loaded dice by name, set default')
       diceUrl = images.squares['1']
   }

   return diceUrl
}

