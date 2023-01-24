import React from 'react'
import styled from 'styled-components'
import Text from '../../../../common/Text/Text'

const Block = ({mess}) => {
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
  text-align: center;
  width: 90%;
  height: auto;
  padding: 15px;
  border-radius: 10px;
  margin: 5px auto;
  white-space: pre-wrap;
  background-color: rgba(234, 79, 73, 0.87);
`

const MessageText = styled(Text)`
    width: 100%;
`

export default Block