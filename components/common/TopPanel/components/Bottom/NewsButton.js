import React from "react";
import styled from "styled-components";
import Img from "../../../../../assets/news/news-icon.png";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import bg from "../../../../../assets/topPanel/btns/button.png";
import { transitionState } from "../../../../utils/utils";
import Text from "../../../Text/Text";
import InfoWithoutNumberButton from "../../../Info/InfoWithoutNumberButton";
import { useSelector } from "react-redux";
import { selectUnreadedNews } from "../../../../redux/reducers/News/NewsReducer";

const NewsButton = () =>{

    const unreadedNews = useSelector(selectUnreadedNews)
    
    const OpenRoad = () => {
        Sounds.loadAndPlayFile(soundsType.click2)
        transitionState('NewsScreen')
    }

    return (
        <BtnBackground source={bg} resizeMode={'stretch'}>

            {unreadedNews > 0 && <InfoWithoutNumberButton />}

            <Btn onPress={OpenRoad} activeOpacity={0.9}>
                <NewsImg source={Img} resizeMode='stretch'/>
                <TextContainer>
                    <Text setShadow madium blod center>news</Text>
                </TextContainer>
            </Btn>
        </BtnBackground>
    )
}

const BtnBackground = styled.ImageBackground`
  flex: 0.40;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  margin-right: 2px;
`

const Btn = styled.TouchableOpacity`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`
const NewsImg = styled.Image`
    width: 40px;
    height: 40px;
    margin-top: -10px;
`

const TextContainer = styled.View`
  position: absolute;
  bottom: -15px;
`

export default NewsButton