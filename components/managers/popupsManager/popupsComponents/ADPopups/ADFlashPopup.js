import React from 'react';
import styled from "styled-components";
import ModalWrapper from "../../../../common/ModalWindows/ModalWrapper";
import {connect, useDispatch, useSelector} from "react-redux";
import ButtonWithText from "../../../../common/Buttons/ButtonWithText";
import {Platform, useWindowDimensions} from "react-native";
import {selectADFlashPopup, setADFlashPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import Text from "../../../../common/Text/Text";
import video from "../../../../../assets/result/film-slate.png";
import {TestIds, useInterstitialAd} from "react-native-google-mobile-ads";
import Sounds, {soundsType} from "../../../../utils/Sounds";
import {getADFlashBonus} from "../../../../protocol/API/API";
import {selectMyUser} from "../../../../redux/reducers/players/PlayersReducer";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";

const ADFlashPopup = (props) => {

    const AdUnitID = Platform.OS === 'ios'
        ? process.env.APP_TYPE !== 'development' && props.ENABLE_AD_PROD && props.ENABLE_AD_IOS_PROD ? 'ca-app-pub-6421975370931679~2323680627' : TestIds.INTERSTITIAL
        : process.env.APP_TYPE !== 'development' && props.ENABLE_AD_PROD && props.ENABLE_AD_ANDROID_PROD ? 'ca-app-pub-6421975370931679/4342087577' : TestIds.INTERSTITIAL

    const { isLoaded, isClosed, load, show } = useInterstitialAd(AdUnitID, {
        requestNonPersonalizedAdsOnly: true,
    });

    const {width, height} = useWindowDimensions()
    const dispatch = useDispatch()
    const myUser = useSelector(selectMyUser)
    const adFlash = useSelector(selectADFlashPopup)

    const getADBonus = async () =>{
        if(myUser.id && adFlash.data.flash){
            await getADFlashBonus(myUser.id, 3)
            closePopup()
        } else {
            closePopup()
        }
    }

    const watchVideo = () =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        if (isLoaded) {
            show();
        }
    }

    const closePopup = () =>{
        dispatch(setADFlashPopup({visible: false, data: null}))
    }

    React.useEffect(() => {
        load();
    }, [load]);

    React.useEffect(() => {
        if (isClosed) {
            getADBonus()
        }
    }, [isClosed, navigation]);

    return (
        <ModalWrapper modalBG={'default'} height={height / 3} modalVisible={true}>
            <Container>
                <TextContainer style={{borderBottomWidth: 3}}>
                    <Text setShadow={true} blod large center>{props.text1}</Text>
                    <VideoImage source={video} resizeMode="cover"/>
                    <Text setShadow={true} blod large center>{props.text2}</Text>
                </TextContainer>
                <ButtonContainer>
                    {isLoaded &&
                        <ButtonWithText  width={'45%'}
                                         height={'40px'}
                                         text={props.watchVideo}
                                         clickHandler={watchVideo}/>
                    }

                    <ButtonWithText  width={'45%'}
                                     height={'40px'}
                                     color={'#e75959'}
                                     text={props.skip}
                                     clickHandler={closePopup}/>
                </ButtonContainer>

            </Container>
        </ModalWrapper>
    );
};

const Container = styled.View`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  width: 100%;
  height: 100%;
`
const TextContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid rgba(101, 65, 56, 0.8);
  background-color: rgba(145, 93, 82, 0.8);
  border-radius: 20px;
  width: 100%;
  height: 60%;
  padding: 20px;
`

const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  width: 100%;
`
const VideoImage = styled.Image`
  width: 80px;
  height: 80px;
  margin: 10px auto;
`
const mapStateToProps = (state) => ({
    watchVideo: selectTranslation(state, defaultTranslation.TR_WATCH_VIDEO),
    skip: selectTranslation(state, defaultTranslation.TR_SKIP),
    text1: selectTranslation(state, defaultTranslation.TR_WATCH_VIDEO_FLASH_TXT1),
    text2: selectTranslation(state, defaultTranslation.TR_WATCH_VIDEO_FLASH_TXT2),
});

export default connect(mapStateToProps)(ADFlashPopup);