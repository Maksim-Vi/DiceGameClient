import React from "react";
import styled from "styled-components";
import InfoButton from "../../../Info/InfoButton";
import {useDispatch, useSelector} from "react-redux";
import {selectAvailableToClaim} from "../../../../redux/reducers/gifts/GiftsReducer";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import bg from "../../../../../assets/topPanel/btns/rewards.png";
import Text from "../../../Text/Text";
import {setRewardsPopup} from "../../../../redux/reducers/popups/PopupsReducer";

const RewardsButton = () =>{

    const dispatch = useDispatch()
    const availableToClaim = useSelector(selectAvailableToClaim)

    const OpenSevenDays = () => {
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setRewardsPopup({visible: true, data: null}))
    }

    return (
        <BtnBackground source={bg} resizeMode={'stretch'}>
            <RewardBtn onPress={OpenSevenDays} activeOpacity={0.9}>
                {availableToClaim && +availableToClaim > 0 ? <InfoButton count={String(availableToClaim)}/> : null}
                <Text setShadow={true} large blod center>Rewards</Text>
            </RewardBtn>
        </BtnBackground>
    )
}

const BtnBackground = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 70px;
  margin-right: 5px;
`

const RewardBtn = styled.TouchableOpacity`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export default RewardsButton