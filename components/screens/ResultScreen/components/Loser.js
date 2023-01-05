import React from 'react'
import styled from 'styled-components'
import Text from '../../../common/Text/Text'
import place from '../../../../assets/result/place_2.png'
import Avatar from '../../../common/Avatars/Avatar'
import { setTimingAnimated } from '../../../utils/Animation'
import { Animated, Easing } from 'react-native'
import {selectTranslation} from "../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../redux/reducers/language/defaultTranslation";
import {connect} from "react-redux";

const Loser = ({loser, ...props}) => {

    const animatedValue = React.useRef(new Animated.Value(0)).current;
   
    const animateWinner = () => {
		Animated.sequence([
            Animated.delay(1500),
			setTimingAnimated(animatedValue, 1.1, 500, Easing.ease),
			setTimingAnimated(animatedValue, 1, 400, Easing.ease),
            Animated.delay(500),
            setTimingAnimated(animatedValue, 0.9, 700, Easing.ease)
		]).start();
	}
   
    React.useEffect(()=>{
        animateWinner()
    },[])

   
    if(!loser) return null

    return (
        <LoserContainer style={{ 
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
            <Container>
                <PlaceContainer>
                    <Place source={place} resizeMode={ 'stretch'}/>
                    <Avatar width={50} height={50} avatarId={loser.player.avatar}/>
                </PlaceContainer>

                <NameTextContainer>
                    <Text numberOfLines={1} title heavy color={'#170231'}>{loser.player.username}</Text>
                    <Text color={'#fff'}>{props.place} №2</Text>
                </NameTextContainer>

                <WinsContainer>
                    <Text numberOfLines={1} medium heavy color={'#fff'}>{props.coins}: {loser.items.coins}</Text>
                    <Text numberOfLines={1} medium heavy color={'#fff'}>{props.diamonds}: {loser.items.crystals}</Text>
                    <Text numberOfLines={1} medium heavy color={'#000'}> {props.combinations}:
                        <Text large heavy color={'#fff'}> {loser.items.scores}</Text>
                    </Text>
                </WinsContainer>
            </Container>


        </LoserContainer>
    )
}

const LoserContainer = styled(Animated.View)`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90%;
    height: 80px;
    border-radius: 15px;
    margin: 10px auto;
    background-color: #02b7f5;
    border: 2px solid #076e91;
`

const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    width: 100%;
    padding: 5px;
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
    width: 20%;
`
const WinsContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-left: auto;
    margin-right: 20px;
`
const mapStateToProps = (state) => ({
    place: selectTranslation(state,defaultTranslation.TR_PLACE),
    coins: selectTranslation(state,defaultTranslation.TR_COINS),
    diamonds: selectTranslation(state,defaultTranslation.TR_DIAMONDS),
    combinations: selectTranslation(state,defaultTranslation.TR_COMBINATIONS),
})

export default connect(mapStateToProps)(Loser);