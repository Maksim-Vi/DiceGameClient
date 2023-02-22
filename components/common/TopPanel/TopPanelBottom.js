import React from 'react';
import styled from "styled-components";
import RoadButton from './components/Bottom/RoadButton';
import UserInfo from "./components/Bottom/UserInfo";
import SlideScreen from "../AnimationScreens/SlideScreen";
import SevenDaysGiftButton from "./components/Bottom/SevenDaysGiftButton";
import {useDispatch, useSelector} from "react-redux";
import {selectIsFinishedSevenDays} from "../../redux/reducers/gifts/GiftsReducer";
import {selectDefaultParams} from "../../redux/reducers/language/LanguageReducer";
import defaultParams from "../../redux/reducers/language/defaultParams";
import Text from "../Text/Text";
import {selectMyUser} from "../../redux/reducers/players/PlayersReducer";
import {setTestBtnsPopup} from "../../redux/reducers/popups/PopupsReducer";

const TopPanelBottom = (props) => {

    const dispatch = useDispatch()
    const myUser = useSelector(selectMyUser)
    const isFinishedSevenDayGifts = useSelector(selectIsFinishedSevenDays)
    const ENABLE_ROAD = useSelector(state => selectDefaultParams(state, defaultParams.ENABLE_ROAD))
    const ENABLE_SEVEN_DAYS_GIFT = useSelector(state => selectDefaultParams(state, defaultParams.ENABLE_SEVEN_DAYS_GIFT))

    const testBtnClick = () =>{
        dispatch(setTestBtnsPopup({visible: true}))
    }

    return (
        <PanelBottom>
            <UserInfo userData={props.userData}/>

            <SlideScreen left={false}>
                <PanelEndContainer>
                    {myUser && (myUser.admin === 'true' || myUser.admin === true) &&
                        <Test onPress={testBtnClick} style={{ borderBottomWidth: 5 }}>
                            <Text color={'#000'}>Admin</Text>
                        </Test>
                    }
                    {ENABLE_ROAD && <RoadButton />}
                    {ENABLE_SEVEN_DAYS_GIFT && !isFinishedSevenDayGifts && <SevenDaysGiftButton/>}
                </PanelEndContainer>
            </SlideScreen>
        </PanelBottom>
    );
};

const PanelBottom = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 98%;
    margin-top: 10px;
    z-index: 1;
`
const PanelEndContainer = styled.View`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap-reverse;
  width: 100%;
  height: 200px;
`

const Test = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 30px;
  border-radius: 10px;
  margin: 5px;
  background-color: #ffefb1;
  border: 2px solid #ed9f39;
`
export default TopPanelBottom;