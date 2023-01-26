import Sound from 'react-native-sound'
import {selectSoundsInfo} from "../redux/reducers/language/LanguageReducer";
import {store} from "../redux/redux-store";


export const soundsType = {
     drop: require('../../sounds/drop.mp3') ,
     click: require('../../sounds/click.mp3') ,
     click2: require('../../sounds/click2.mp3') ,
     click3: require( '../../sounds/click3.mp3'),
     moneyDrop: require('../../sounds/money-drop.mp3') ,
     moneyDrop2: require( '../../sounds/money-drop2.mp3'),
     throwDice: require('../../sounds/throw-dice.mp3') ,
     throwDice2: require('../../sounds/throw-dice2.mp3') ,
     LvlUp: require('../../sounds/LvlUp.mp3') ,
     roundFinish: require('../../sounds/round-finish.mp3') ,
}

export default new class Sounds {
    constructor() {

        this.enableSounds = false
        this.loadSound = null

        this.init()
    }

    init = () =>{
        this.enableSounds = selectSoundsInfo(store.getState())
        Sound.setCategory('Playback');
    }

    loadAndPlayFile = (fileName) =>{
        this.enableSounds = selectSoundsInfo(store.getState())

        if(!this.enableSounds) return

        try {
             this.loadSound = new Sound(fileName, (error) => {
                if (error) return console.log('failed to load the sound');
                 this.playFile()
            });
            this.loadSound.release();
        } catch (e) {
            console.log('cannot play the song file')
        }
    }

    playFile = () =>{
        try {
            this.loadSound.reset();
            this.setVolumeFile(1)
            this.loadSound.play((success) => {
                if (success) {
                    this.stopFile()
                }
            });
        } catch (e) {
            console.log('cannot stop the song file')
        }
    }

    stopFile = () =>{
        try {
            if(this.loadSound.isPlaying()){
                this.loadSound.stop();
            }
        } catch (e) {
            console.log('cannot stop the song file')
        }
    }

    pauseFile = () =>{
        try {
            if(this.loadSound.isPlaying()){
                this.loadSound.pause();
            }
        } catch (e) {
            console.log('cannot pause the song file')
        }
    }


    setVolumeFile = (volume) =>{
        try {
            this.loadSound.setVolume(volume || 1);
        } catch (e) {
            console.log('cannot setVolume the song file')
        }
    }

    setNumberOfLoopsFile = (numLoop) =>{
        try {
            this.loadSound.setNumberOfLoops(numLoop || -1);
        } catch (e) {
            console.log('cannot setVolume the song file')
        }
    }

}()