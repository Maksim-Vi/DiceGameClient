import React from "react";
import styled from "styled-components";
import InfoButton from "../../../Info/InfoButton";
import {useDispatch, useSelector} from "react-redux";
import {selectAvailableToClaim} from "../../../../redux/reducers/gifts/GiftsReducer";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import bg from "../../../../../assets/topPanel/btns/rewards.png";
import Text from "../../../Text/Text";
import {setRewardsPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";
import InfoWithoutNumberButton from "../../../Info/InfoWithoutNumberButton";

const RewardsButton = () =>{

    const dispatch = useDispatch()
    const availableToClaim = useSelector(selectAvailableToClaim)
    const rewards = useSelector(state => selectTranslation(state, defaultTranslation.TR_REWARDS))

    const OpenSevenDays = () => {
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setRewardsPopup({visible: true, data: null}))
    }

    return (
        <BtnBackground source={bg} resizeMode={'stretch'}>
            <RewardBtn onPress={OpenSevenDays} activeOpacity={0.9}>
                {availableToClaim && +availableToClaim > 0 ? <InfoWithoutNumberButton /> : null}
                <Text setShadow={true} large blod center>{rewards}</Text>
            </RewardBtn>
        </BtnBackground>
    )
}

const BtnBackground = styled.ImageBackground`
  flex: 0.70;
  display: flex;
  align-items: center;
  justify-content: center;
  //width: 130px;
  height: 70px;
  margin-right: 2px;
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