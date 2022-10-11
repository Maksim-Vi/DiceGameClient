import React from 'react'
import styled from 'styled-components'
import Avatar from '../../../common/Avatars/Avatar'
import Text from '../../../common/Text/Text'
import place from '../../../../assets/result/place_1.png'
import { setTimingAnimated } from '../../../utils/Animation'
import { Animated, Easing } from 'react-native'

const Winner = ({winner}) => {
    
    const animatedValue = React.useRef(new Animated.Value(0)).current;
   
    const animateWinner = () => {
		Animated.sequence([
            Animated.delay(1000),
			setTimingAnimated(animatedValue, 1.1, 500, Easing.ease),
			setTimingAnimated(animatedValue, 1, 400, Easing.ease),
		]).start();
	}
   
    React.useEffect(()=>{
        animateWinner()  
    },[])

     
    if(!winner) return null

    return (
        <WinnerContainer style={{ 
            borderBottomWidth: 5,
            opacity: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }),
            transform: [
                {
                    scale: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    })
                }
            ]
        }}>
            <PlaceContainer>
                <Place source={place} resizeMode={ 'stretch'}/>
                <Avatar width={50} height={50} avatarId={winner.player.avatar}/>
            </PlaceContainer>

            <NameTextContainer>
                <Text title heavy color={'#170231'}>{winner.player.username}</Text>
                <Text color={'#fff'}>Place №1</Text>
            </NameTextContainer>

            <WinsContainer>
                <Text medium heavy color={'#fff'}>coins: {winner.items.coins}</Text>
                <Text medium heavy color={'#fff'}>crystals: {winner.items.crystals}</Text>
                <Text medium heavy color={'#000'}> Combinations: 
                    <Text large heavy color={'#fff'}> {winner.items.scores}</Text> 
                </Text>
            </WinsContainer>

        </WinnerContainer>
    )
}

const WinnerContainer = styled(Animated.View)`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90%;
    height: 80px;
    border-radius: 15px;
    background-color: #fecc6b;
    border: 2px solid #955d3d;
`

const PlaceContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
`
const Place = styled.Image`
    width: 50px;
    height: 50px;
    margin: 0 5px;
`
const NameTextContainer = styled.View`
    display: flex;
    flex-direction: column;
`
const WinsContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-left: auto;
    margin-right: 20px;
`

export default Winner