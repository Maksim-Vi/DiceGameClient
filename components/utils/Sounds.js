import Sound from 'react-native-sound'
import {selectSoundsInfo} from "../redux/reducers/language/LanguageReducer";
import {store} from "../redux/redux-store";

export const soundsType = {
     drop: require('./sounds/drop.mp3') ,
     click: require('./sounds/click.mp3') ,
     click2: require('./sounds/click2.mp3') ,
     click3: require( './sounds/click3.mp3'),
     moneyDrop: require('./sounds/money-drop.mp3') ,
     moneyDrop2: require( './sounds/money-drop2.mp3'),
     throwDice: require('./sounds/throw-dice.mp3') ,
     throwDice2: require('./sounds/throw-dice2.mp3') ,
     LvlUp: require('./sounds/LvlUp.mp3') ,
     roundFinish: require('./sounds/round-finish.mp3') ,
    roundFinishLose: require('./sounds/lose.mp3') ,
    accept: require('./sounds/acept.mp3') ,
    dzen: require('./sounds/dzen.mp3') ,
    stars: require('./sounds/stars2.mp3') ,
    startLoad: require('./sounds/start-load.mp3') ,
    startLoad2: require('./sounds/start-load2.mp3') ,
    salut: require('./sounds/zvuk-saljuta.mp3') ,
}

export default new class Sounds {
    constructor() {

        this.enableSounds = false
        this.loadSound = null

        this.init()
    }

    init = () =>{
        if(store) this.enableSounds = selectSoundsInfo(store.getState())
        Sound.setCategory('Playback');
    }

    loadAndPlayFile = (fileName) =>{
        if(store) this.enableSounds = selectSoundsInfo(store.getState())

        if(!this.enableSounds) return

        this.stopFile()
         this.loadSound = new Sound(fileName, (error) => {
            if (error) return console.log('failed to load the sound');

             this.playFile()
        });
        this.loadSound.release();
    }

    playFile = () =>{
        this.setVolumeFile(1)
        this.loadSound.play((success) => {
            if (success) {
                this.stopFile()
            }
        });
    }

    stopFile = () =>{
        if(this.loadSound && this.loadSound.isPlaying()){
            this.loadSound.stop();
        }
    }

    pauseFile = () =>{
        if(this.loadSound.isPlaying()){
            this.loadSound.pause();
        }
    }


    setVolumeFile = (volume) =>{
        this.loadSound.setVolume(volume || 1);
    }

    setNumberOfLoopsFile = (numLoop) =>{
        this.loadSound.setNumberOfLoops(numLoop || -1);
    }

}()