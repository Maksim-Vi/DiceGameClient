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

const soundsArray = [
  {type: soundsType.drop, url: require('./sounds/drop.mp3')},
  {type: soundsType.click, url: require('./sounds/click.mp3')},
  {type: soundsType.click2, url: require('./sounds/click2.mp3')},
  {type: soundsType.click3, url: require('./sounds/click3.mp3')},
  {type: soundsType.moneyDrop, url: require('./sounds/money-drop.mp3')},
  {type: soundsType.moneyDrop2, url: require('./sounds/money-drop2.mp3')},
  {type: soundsType.throwDice, url: require('./sounds/throw-dice.mp3')},
  {type: soundsType.throwDice2, url: require('./sounds/throw-dice2.mp3')},
  {type: soundsType.LvlUp, url: require('./sounds/LvlUp.mp3')},
  {type: soundsType.roundFinish, url: require('./sounds/round-finish.mp3')},
  {type: soundsType.roundFinishLose, url: require('./sounds/lose.mp3')},
  {type: soundsType.accept, url: require('./sounds/acept.mp3')},
  {type: soundsType.dzen, url: require('./sounds/dzen.mp3')},
  {type: soundsType.stars, url: require('./sounds/stars2.mp3')},
  {type: soundsType.startLoad, url: require('./sounds/start-load.mp3')},
  {type: soundsType.startLoad2, url: require('./sounds/start-load2.mp3')},
  {type: soundsType.salut, url: require('./sounds/zvuk-saljuta.mp3')}
]

export default new class Sounds {
    constructor() {

        this.enableSounds = false
        this.loadSound = {}

        this.init()
    }

    init = () =>{
        if(store) this.enableSounds = selectSoundsInfo(store.getState())
        Sound.setCategory('Playback');
        this.initSounds()
    }

    initSounds = () => {
      soundsArray.forEach(sound => {
        const newSound = new Sound(sound.type, (error) => {
          if (error) return console.log('failed to load the sound');
        });
        this.loadSound[sound.type] = newSound
      })
    }

    loadAndPlayFile = (fileName) =>{
        if(store) this.enableSounds = selectSoundsInfo(store.getState())

        if(!this.enableSounds) return
        Sound.setCategory('Playback');

        if (!this.loadSound[fileName]) {
          const newSound = new Sound(fileName, (error) => {
            if (error) return console.log('failed to load the sound');
          });
          this.loadSound[fileName] = newSound
          this.playFile(fileName)
        } else {
          this.playFile(fileName)
        }
    }

    playFile = (fileName) =>{
        this.setVolumeFile(1, fileName)
        this.loadSound[fileName].play((success) => {
            if (success) {
                this.stopFile(fileName)
            }
        });
    }

    stopFile = (fileName) =>{
        if(this.loadSound[fileName] && this.loadSound[fileName].isPlaying()){
            this.loadSound[fileName].stop();
        }
    }

    pauseFile = (fileName) =>{
        if(this.loadSound[fileName].isPlaying()){
            this.loadSound[fileName].pause();
        }
    }


    setVolumeFile = (volume, fileName) =>{
        this.loadSound[fileName].setVolume(volume || 1);
    }

    setNumberOfLoopsFile = (numLoop, fileName) =>{
        this.loadSound[fileName].setNumberOfLoops(numLoop || -1);
    }

}()