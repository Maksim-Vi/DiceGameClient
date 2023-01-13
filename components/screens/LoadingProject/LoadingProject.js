import React from 'react'
import BackgroundWrapper from '../../common/BackgroundWrapper/BackgroundWrapper'
import {
	StyleSheet,
	View,
	Animated,
} from 'react-native';
import styled from 'styled-components';
import Text from "../../common/Text/Text";
import { setTimingAnimated } from '../../utils/Animation';

const ObjectAnimated = ({ value, opacity, y }) => (
	<Animated.View
		style={[styles.diamond, {
			opacity: value.interpolate({
				inputRange: [0, 1, 2, 3, 4, 5, 6, 7],
				outputRange: opacity,
			}),
			transform: [{
				rotateY: value.interpolate({
					inputRange: [0, 1, 2, 3, 4, 5, 6, 7],
					outputRange: y,
				}),
			}],
		}]}
	/>
);

const LoadingProject = () => {

	const animatedValue = React.useRef(new Animated.Value(0)).current;

	const animate = () => {
		Animated.sequence([
			setTimingAnimated(animatedValue, 0, 200),
			setTimingAnimated(animatedValue, 1, 200),
			setTimingAnimated(animatedValue, 2, 200),
			setTimingAnimated(animatedValue, 3, 200),
			setTimingAnimated(animatedValue, 4, 200),
			setTimingAnimated(animatedValue, 5, 200),
			setTimingAnimated(animatedValue, 6, 200),
			setTimingAnimated(animatedValue, 7, 200),
		]).start(() => {
			animatedValue.setValue(0);
			animate();
		});
	}

	React.useEffect(() => {
		animate();
	  return () => {}
	}, [])
	
	return (
		<BackgroundWrapper>
			<LoadingContainer>
				<Text title heavy color={'#fff'} center>Knocky Dice</Text>
				<View style={styles.container}>
					<View style={[styles.groupColumn, {
						transform: [{ rotateZ: '45deg' }],
					}]}
					>
						<View style={styles.groupRow}>
							<ObjectAnimated
								value={animatedValue}
								opacity={[1, 0, 0, 0, 1, 1, 1, 1]}
								y={['180deg', '0deg', '0deg', '0deg', '0deg', '0deg', '0deg', '0deg']}
							/>
							<ObjectAnimated
								value={animatedValue}
								opacity={[1, 1, 0, 0, 0, 1, 1, 1]}
								y={['0deg', '0deg', '180deg', '0deg', '0deg', '0deg', '0deg', '0deg']}
							/>
						</View>
						<View style={styles.groupRow}>
							<ObjectAnimated
								value={animatedValue}
								opacity={[1, 1, 1, 1, 0, 0, 0, 1]}
								y={['0deg', '0deg', '0deg', '0deg', '180deg', '0deg', '0deg', '0deg']}
							/>
							<ObjectAnimated
								value={animatedValue}
								opacity={[1, 1, 1, 0, 0, 0, 1, 1]}
								y={['0deg', '0deg', '0deg', '180deg', '0deg', '0deg', '0deg', '0deg']}
							/>
						</View>
					</View>
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
