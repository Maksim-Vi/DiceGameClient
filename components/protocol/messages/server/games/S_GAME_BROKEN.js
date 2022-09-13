
export default class S_GAME_BROKEN {
    constructor(gameId){

        this.MESSAG_ENAME = 'S_GAME_BROKEN'
        this.showLog = true

        this.gameId = gameId

        this.init()
    }

    init() {
        this.getLogText()
        this.exec()
    }

    exec() {
       window.navigation.navigate('MainScreen')
    }

	getLogText() {
        if(this.showLog){
		    console.log(`${this.MESSAG_ENAME}`);
        }
    }

}