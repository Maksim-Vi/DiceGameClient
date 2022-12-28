import React, {useState} from 'react';
import styled from "styled-components";
import EmojiSelector, {Categories} from "react-native-emoji-selector";

const EmojisPanel = (props) => {

    const selectedEmoji = (emoji) =>{
        if(props.messageData.addEmojiCount < 3){
            const newMessEmoji = props.messageData.message + emoji
            //props.setMessage(newMessEmoji)

            props.setMessageData({
                ...props.messageData,
                message: newMessEmoji,
                addEmojiCount: props.messageData.addEmojiCount + 1
            })
        }
    }

    return (
        <EmojiContainer>
            <EmojiSelector category={Categories.emotion}
                           columns={7}
                           theme={'#0b61abb0'}
                           showSearchBar={false}
                           showSectionTitles={false}
                           onEmojiSelected={emoji =>selectedEmoji(emoji)} />
        </EmojiContainer>
    )
}

const EmojiContainer = styled.View`
  flex: 0.35;
  display: flex;
  align-items: center;
  width: 95%;
  height: 100%;
  border-radius: 10px;
  background-color: #0b61abb0;
`

export default EmojisPanel;