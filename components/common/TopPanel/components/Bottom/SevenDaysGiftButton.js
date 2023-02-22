import React from "react";
import styled from "styled-components";
import Img from "../../../../../assets/Gifts/calender7-icon.png";
import InfoButton from "../../../Info/InfoButton";
import TextWithoutShadowStyle from "../../../Text/TextWithoutShadow";
import {setSevenDaysGiftPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {useDispatch, useSelector} from "react-redux";
import {selectAvailableToClaim} from "../../../../redux/reducers/gifts/GiftsReducer";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import bg from "../../../../../assets/topPanel/btns/button.png";
import BackgroundButtons from "../../../BackgroundWrapper/BackgroundButtons";

const SevenDaysGiftButton = () =>{

    const dispatch = useDispatch()
    const availableToClaim = useSelector(selectAvailableToClaim)

    const OpenSevenDays = () => {
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setSevenDaysGiftPopup({visible: true, data: null}))
    }

    return (
        <BackgroundButtons marginBottom={5} bgButton={bg}>
            <RewardBtn onPress={OpenSevenDays}>
                {availableToClaim && +availableToClaim > 0 ? <InfoButton count={String(availableToClaim)}/> : null}
                <RoadImg source={Img} resizeMode='stretch'/>
            </RewardBtn>
        </BackgroundButtons>
    )
}

const RewardBtn = styled.TouchableOpacity`
    position: relative;
    width: 45px;
    height: 45px;
`
const RoadImg = styled.Image`
    margin: auto;
    width: 70%;
    height: 70%;
`

const TextSeven = styled(TextWithoutShadowStyle)`
  position: absolute;
  left: 22%;
  top: 40%;
  
`

export default SevenDaysGiftButton