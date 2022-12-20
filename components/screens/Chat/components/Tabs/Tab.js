import React from 'react'
import styled from 'styled-components'
import Text from '../../../../common/Text/Text'

const Tab = (props) => {

    const openTab = () =>{

    }

    return (
        <TabContainer activeOpacity={0.9} onPress={openTab}>
            <Image source={props.image} />
            <Text small>{props.tabName}</Text>
        </TabContainer>
    )
}

const TabContainer = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 30%;
    padding: 2px 0;
    margin: 10px 0;
    border-radius: 10px;
    background-color: #025198c9;  
`
const Image = styled.Image`
    width: 25px;
    height: 25px;
`

const TabButton = styled.TouchableWithoutFeedback`
    width: 25px;
    height: 25px;
`

export default Tab