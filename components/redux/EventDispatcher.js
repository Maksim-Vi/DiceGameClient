import { EventRegister } from 'react-native-event-listeners'

export default new class EventDispatcher {
  constructor(){}

  publish = (eventName, data) => {
    EventRegister.emit(eventName, { detail: data })
  }

  subscribe = (eventName, listener) => {
    const subscriber = EventRegister.addEventListener(eventName, (event) => {
      listener(event.detail)
    })

    return subscriber
  }

  unsubscribe = (listener) => {
    if(listener){
      EventRegister.removeEventListener(listener)
    }
  }
  
}()