import React from 'react';
import styled from "styled-components";
import defImage from "../../../../../../../assets/Gifts/calendar.png";
import bg from "../../../../../../../assets/Gifts/bg/rewards.png";
import bgActive from "../../../../../../../assets/Gifts/bg/rewardsActive.png";
import Text from "../../../../../../common/Text/Text";
import {useSelector} from "react-redux";
import {selectAvailableToClaim} from "../../../../../../redux/reducers/gifts/GiftsReducer";
import InfoButton from "../../../../../../common/Info/InfoButton";

const Tab = (props) => {

    const availableToClaim = useSelector(selectAvailableToClaim)

    const handlerClick = () =>{
        props.changeTab(props.nameTab)
    }

    return (
        <TabContainer {...props} source={!props.isActive ? bg : bgActive} resizeMode={'stretch'}>
            <TabBtn onPress={handlerClick} activeOpacity={0.9}>
                <ImageTab source={props.image ? props.image : defImage}/>
                {props.isActive && <Text setShadow={true} small blod center>{props.text}</Text>}
            </TabBtn>
            {props.nameTab === 'sevenDays' && availableToClaim && +availableToClaim > 0
                ? <InfoButton count={String(availableToClaim)}/>
                : null
            }
        </TabContainer>
    );
};

const TabContainer = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: ${props => props.isActive ? '120px' : '80px'};
  height: 60px;
  margin-left: 10px;
`
const TabBtn = styled.TouchableOpacity`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ImageTab = styled.Image`
  width: 40px;
  height: 40px;
`

export default Tab;