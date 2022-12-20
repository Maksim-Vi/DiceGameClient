import React from 'react'
import styled from 'styled-components'
import Text from '../../../../common/Text/Text'

const Info = ({mess}) => {
    return (
        <MessageContainer>
            <MessageText small light center color={'#fff'}>{mess.chatMessage}</MessageText>
        </MessageContainer>
    )
}

const MessageContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  height: auto;
  padding: 10px;
  border-radius: 10px;
  margin: 5px auto;
  white-space: pre-wrap;
  background-color: rgba(6, 139, 215, 0.79);
`

const MessageText = styled(Text)`
    width: 100%;
`

export default Info