import React, {useState} from "react";
import Text from "../../../Text/Text";
import styled from "styled-components";
import flash from "../../../../../assets/topPanel/flash.png";
import add from "../../../../../assets/topPanel/btns/add-green.png";
import {Animated, Easing} from "react-native";
import {setTimingAnimated} from "../../../../utils/Animation";
import {store} from "../../../../redux/redux-store";
import {setADFlashPopup, setFlashInfoPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import FlashInfo from "./FlashInfo";
import {useSelector} from "react-redux";
import {selectDefaultParams} from "../../../../redux/reducers/language/LanguageReducer";
import defaultParams from "../../../../redux/reducers/language/defaultParams";

const Flash = (props) => {

    const animatedVideoBtnValue = React.useRef(new Animated.Value(0)).current;
    const isEnabledADFlash = useSelector(state => selectDefaultParams(state, defaultParams.ENABLE_AD_FLASH))

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
        if(props.flash <= 10 && isEnabledADFlash === true){
            store.dispatch(setADFlashPopup({visible: true, data: {flash: props.flash}}))
        } else {
            store.dispatch(setFlashInfoPopup({visible: true, data: null}))
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
                   <Text setShadow blod medium>{props.flash || 0}</Text>

                   {props.flash <= 10 && isEnabledADFlash === true &&
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
  position: relative;
  border: 2px solid rgb(255, 157, 77);
  border-radius: 5px;
  background-color: #00eaff;
  padding: 2px 20px 2px 20px;
  z-index: 11;
`

const ButtonClick = styled.TouchableWithoutFeedback`
  z-index: 11;
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
  top: -3px;
  right: -15px;
`
const AddImage = styled.Image`
  width: 25px;
  height: 25px;
`

export default Flash