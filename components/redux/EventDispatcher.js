import { DeviceEventEmitter } from "react-native";
import { EventRegister } from 'react-native-event-listeners'

export default new class EventDispatcher {
  constructor(){

  }

  publish = (eventName, data) => {
    console.log('ANSWER publish');
    //DeviceEventEmitter.emit(eventName, { detail: data });
    EventRegister.emit(eventName, { detail: data })
  }

  subscribe = (eventName, listener) => {
    console.log('ANSWER subscribe');

    // const subscriber = DeviceEventEmitter.addListener(eventName, (event)=>{
    //   listener(event.detail)
    // })
    const subscriber = EventRegister.addEventListener(eventName, (event) => {
      listener(event.detail)
    })

    return subscriber
  }

  unsubscribe = (listener) => {
    console.log('ANSWER unsubscribe');

    if(listener){
      //DeviceEventEmitter.removeListener(eventName);
      //listener.remove()
      EventRegister.removeEventListener(listener)
    }
  }
  
}()