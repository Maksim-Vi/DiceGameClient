import React, {useEffect} from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import {
	StyleSheet,
	View,
	Animated, Easing,
} from 'react-native';
import styled from 'styled-components';
import Text from "../../common/Text/Text";
import bag from '../../../assets/bg/main_bg.jpg'
import three from '../../../assets/collections/dices/d_4/dice_3.png'
import six from '../../../assets/collections/dices/d_4/dice_6.png'
import starsAnim from "../../../assets/animation/lottieAnim/purpure-stars.json";
import AnimatedLottieView from "lottie-react-native";
import {setTimingAnimated} from "../../utils/Animation";
import logo from "../../../assets/common/logo.png";
import Logo from "../../common/Logo/Logo";

const LoadingProject = () => {
	const animFirstValue = React.useRef(new Animated.Value(0)).current;
	const animFirstRotValue = React.useRef(new Animated.Value(0)).current;

	const animSecondValue = React.useRef(new Animated.Value(0)).current;
	const animSecondRotValue = React.useRef(new Animated.Value(0)).current;

	const animFirstDice = () => {
		Animated.loop(
			Animated.sequence([
				setTimingAnimated(animFirstValue, 0, 100, Easing.ease),
				setTimingAnimated(animFirstValue, 1, 200, Easing.ease),
				setTimingAnimated(animFirstValue, 2, 300, Easing.ease),

				setTimingAnimated(animFirstValue, 3, 300, Easing.ease),
				setTimingAnimated(animFirstRotValue, 1, 300, Easing.ease),
				setTimingAnimated(animFirstValue, 2, 300, Easing.ease),
				setTimingAnimated(animFirstValue, 3, 300, Easing.ease),
				setTimingAnimated(animFirstRotValue, 0, 300, Easing.ease),
				setTimingAnimated(animFirstValue, 2, 300, Easing.ease),

				Animated.delay(2000)
			])
		).start();

	}

	const animSecondDice = () => {
		Animated.loop(
			Animated.sequence([
				Animated.delay(2000),

				setTimingAnimated(animSecondValue, 0, 100, Easing.ease),
				setTimingAnimated(animSecondValue, 1, 200, Easing.ease),
				setTimingAnimated(animSecondValue, 2, 300, Easing.ease),

				setTimingAnimated(animSecondValue, 3, 300, Easing.ease),
				setTimingAnimated(animSecondRotValue, 1, 300, Easing.ease),
				setTimingAnimated(animSecondValue, 2, 300, Easing.ease),
				setTimingAnimated(animSecondValue, 3, 300, Easing.ease),
				setTimingAnimated(animSecondRotValue, 0, 300, Easing.ease),
				setTimingAnimated(animSecondValue, 2, 300, Easing.ease),
			])
		).start();
	}

	useEffect(()=>{
		animFirstDice()
		animSecondDice()

		return ()=>{
			animFirstValue.stopAnimation()
			animFirstRotValue.stopAnimation()
			animSecondValue.stopAnimation()
			animSecondRotValue.stopAnimation()

			animFirstValue.setValue(0)
			animFirstRotValue.setValue(0)
			animSecondValue.setValue(0)
			animSecondRotValue.setValue(0)
		}
	}, [])

	return (
		<BackgroundWrapper gackground={bag}>
			<LoadingContainer>
				<Logo />

				<View style={styles.container}>
					<AnimatedLottieView loop
										autoPlay
										source={starsAnim}
										style={{position: 'absolute', opacity: 0.8, width: 400, height: 400}} />
					<DicesContainer>
						<DiceThree style={{
							transform: [
								{
									translateY: animFirstValue.interpolate({
										inputRange: [0,1,2,3],
										outputRange: [0, 5, 0, -80]
									})
								},
								{
									scaleY: animFirstValue.interpolate({
										inputRange: [0, 1, 2],
										outputRange: [1, 0.8, 1]
									})
								},
								{
									rotate: animFirstRotValue.interpolate({
										inputRange: [0,1],
										outputRange: ['0deg','360deg']
									})
								}
							]
						}}
								   source={three}/>
						<DiceSix style={{
							transform: [
								{
									translateY: animSecondValue.interpolate({
										inputRange: [0,1,2,3],
										outputRange: [0, 5, 0, -80]
									})
								},
								{
									scaleY: animSecondValue.interpolate({
										inputRange: [0, 1, 2],
										outputRange: [1, 0.8, 1]
									})
								},
								{
									rotate: animSecondRotValue.interpolate({
										inputRange: [0,1],
										outputRange: ['0deg','360deg']
									})
								}
							]
						}}
								 source={six}/>
					</DicesContainer>

					<AnimatedLottieView loop
										autoPlay
										source={starsAnim}
										style={{position: 'absolute', bottom: -10, opacity: 0.8, width: 400, height: 400}} />

				</View>
				<Text setShadow={true} small color={'#fff'} center>welcome to the us! created by 2022</Text>
			</LoadingContainer>
		</BackgroundWrapper>
	)
	
}
    
const LoadingContainer = styled.View`
    flex: 1;
	position: relative;
    align-items: center;
    justify-content: center;
	padding: 150px 0 20px 0;
`

const DicesContainer = styled.View`
 	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-direction: row;
	width: 50%;
`

const DiceThree = styled(Animated.Image)`
   width: 80px;
	height: 80px;
`

const DiceSix = styled(Animated.Image)`
	width: 80px;
	height: 80px;
`
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	group: {
		width: 100,
		height: 150,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	diamond: {
		width: 50,
		height: 50,
		backgroundColor: '#ff9d4d',
	},
	groupColumn: {
		flexDirection: 'column',
	},
	groupRow: {
		flexDirection: 'row',
	},
});
    
export default LoadingProject
