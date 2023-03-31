import React from "react";
import Text from "../../../Text/Text";
import styled from "styled-components";
import flash from "../../../../../assets/topPanel/flash.png";
import add from "../../../../../assets/common/btns/add.png";
import {Animated, Easing} from "react-native";
import {setTimingAnimated} from "../../../../utils/Animation";
import {store} from "../../../../redux/redux-store";
import {setADFlashPopup} from "../../../../redux/reducers/popups/PopupsReducer";

const Flash = (props) => {

    const animatedVideoBtnValue = React.useRef(new Animated.Value(0)).current;

    const animateVideoBtn = () => {
        Animated.loop(
            Animated.sequence([
                setTimingAnimated(animatedVideoBtnValue, 0, 600, Easing.bounce),
                setTimingAnimated(animatedVideoBtnValue, 1, 1000, Easing.bounce),
                setTimingAnimated(animatedVideoBtnValue, 0, 600, Easing.ease),
            ])
        ).start();
    }

    const showADFlash = () =>{
        if(props.flash <= 10){
            store.dispatch(setADFlashPopup({visible: true, data: {flash: props.flash}}))
        }
    }

    React.useEffect(() => {
        if(props.flash <= 10){
            animateVideoBtn()
        }
    }, [props.flash])

    return (
        <ButtonClick onPress={showADFlash} accessible={false}>
            <CrystalsContainer>
                    <FlashImage source={flash} resizeMode="cover"/>
                    <Text setShadow={true} blod medium>{props.flash || 0}</Text>

                {props.flash <= 10 &&
                    <AddContainer style={{
                        transform: [
                            {
                                scale: animatedVideoBtnValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1.1, 1]
                                })
                            }
                        ]
                    }}>
                        <AddImage source={add} resizeMode="cover"/>
                    </AddContainer>
                }
            </CrystalsContainer>
        </ButtonClick>
    )
}

const CrystalsContainer = styled.View`
  border: 2px solid rgb(255, 157, 77);
  border-radius: 5px;
  background-color: aqua;
  padding: 2px 20px 2px 20px;
`

const ButtonClick = styled.TouchableWithoutFeedback`
 
`

const FlashImage = styled.Image`
  position: absolute;
  top: -5px;
  left: -15px;
  width: 30px;
  height: 30px;
`

const AddContainer = styled(Animated.View)`
  position: absolute;
  top: -5px;
  right: -15px;
`
const AddImage = styled.Image`
  width: 30px;
  height: 30px;
`

export default Flash