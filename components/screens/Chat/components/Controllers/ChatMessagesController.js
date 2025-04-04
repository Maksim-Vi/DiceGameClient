import Message from "../Message/Message";
import Info from "../Message/Info";
import Block from "../Message/Block";

class ChatMassagesController {
    constructor() {
        this.messageTypes = {
            MESSAGE: 'message',
            INFO: 'info',
            BLOCK: 'block',
            ADMIN: 'admin',
            PRIVATE: 'private'

        }
    }

    hendlerMessagesChat = (mess,index) =>{
        switch (mess.type) {
            case this.messageTypes.MESSAGE:{
                return <Message key={index} mess={mess} index={index}/>
            }
            case this.messageTypes.INFO:{
                return <Info key={index} mess={mess} index={index}/>
            }
            case this.messageTypes.BLOCK:{
                return <Block key={index} mess={mess} index={index}/>
            }
            default:
                break
        }
    }
}

export default ChatMassagesController