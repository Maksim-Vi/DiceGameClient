import {setActiveItems, setCurrentUser} from "../../../redux/reducers/players/PlayersReducer"
import { store } from "../../../redux/redux-store"
import {addAvailableCollectionItems} from "../../../redux/reducers/collections/CollectionsReducer";

export default class S_LOGIN_SUCCESS {
    constructor(data){

        this.MESSAG_ENAME = 'S_LOGIN_SUCCESS'
        this.showLog = true

        this.data = data

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
        console.log('USER', this.data.user)
        store.login(this.data)
        store.dispatch(setCurrentUser(this.data.user))
        store.dispatch(setActiveItems(this.data.user.activeItems || {dice: 13, square: 14}))
        store.dispatch(addAvailableCollectionItems(this.data.user.availableCollectionItems || {dice: [13], square: [14],gameBackgrounds:[1]}))

        setTimeout(()=>{
            window.navigation.navigate('MainScreen')
        },1500)
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}