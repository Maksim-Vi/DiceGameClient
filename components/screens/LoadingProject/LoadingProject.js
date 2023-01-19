import React from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import {
	StyleSheet,
	View,
	Animated, useWindowDimensions,
} from 'react-native';
import styled from 'styled-components';
import Text from "../../common/Text/Text";
import bag from '../../../assets/bg/main_bg.jpg'
import dices from "../../../assets/animation/lottieAnim/loadDices.json";
import starsAnim from "../../../assets/animation/lottieAnim/purpure-stars.json";
import AnimatedLottieView from "lottie-react-native";

const LoadingProject = () => {

	const { height, width } = useWindowDimensions();

	return (
		<BackgroundWrapper gackground={bag}>
			<LoadingContainer>
				<Text title heavy color={'#fff'} center>Knocky Dice</Text>
				<View style={styles.container}>
					<AnimatedLottieView loop
										autoPlay
										source={starsAnim}
										style={{position: 'absolute', opacity: 0.8, width: 400, height: 400}} />
					<AnimatedLottieView loop autoPlay source={dices} style={{width: 350, height: 350}} speed={1.2}/>
					<AnimatedLottieView loop
										autoPlay
										source={starsAnim}
										style={{position: 'absolute', bottom: -10, opacity: 0.8, width: 400, height: 400}} />

				</View>
				<Text small color={'#fff'} center>welcome to the us! created by 2022</Text>
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
