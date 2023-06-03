import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Text from '../../../../common/Text/Text'

const Message = ({mess}) => {

    const user = useSelector(state => state.players.myUser)

    const isMyMessage = () =>{
        return user && mess.username 
            ? user.username.toLowerCase() === mess.username.toLowerCase()
            : false
    }

    return (
        <MessageContainer isMyMessage={isMyMessage()}>
            <NameText madium heavy color={'red'}>{mess.username}: </NameText>
            <MessageText small light color={'black'} fontFamily={'Gogono-Cocoa'}>{mess.chatMessage}</MessageText>
        </MessageContainer>
    )
}

const MessageContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 70%;
    height: auto;
    padding: 10px 45px 10px 10px;
    border-radius: 10px;
    margin: 5px;
    white-space: pre-wrap;
    ${(props)=>{
    return props.isMyMessage 
        ? `
            margin-right: 10px;
            margin-left: auto;
            background-color: #77bff5;
        ` 
        : `
            margin-left: 10px;
            background-color: #fcecd2;
        `
    }};
`

const NameText = styled(Text)`
    margin-left: 10px;
`

const MessageText = styled(Text)`
    width: 80%;
    margin-left: 5px;
`

export default Message