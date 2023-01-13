import React from "react";
import styled from "styled-components";
import Img from "../../../../../assets/Gifts/calendar.png";
import InfoButton from "../../../Info/InfoButton";
import TextWithoutShadowStyle from "../../../Text/TextWithoutShadow";
import {setSevenDaysGiftPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {useDispatch, useSelector} from "react-redux";
import {selectAvailableToClaim} from "../../../../redux/reducers/gifts/GiftsReducer";

const SevenDaysGiftButton = () =>{

    const dispatch = useDispatch()
    const availableToClaim = useSelector(selectAvailableToClaim)

    const OpenSevenDays = () => {
        dispatch(setSevenDaysGiftPopup({visible: true, data: null}))
    }

    return (
        <RoadBtn onPress={OpenSevenDays}>
{/*
            {availableToClaim && availableToClaim > 0 && <InfoButton count={availableToClaim || 0}/>}
*/}
            <RoadImg source={Img} resizeMode='stretch'/>
            <TextSeven heavy large color={'#000'}>7-d</TextSeven>
        </RoadBtn>
    )
}

const RoadBtn = styled.TouchableOpacity`
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    margin-right: 5px;
    margin-top: 5px;
    background-color: rgb(1,1,70);
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