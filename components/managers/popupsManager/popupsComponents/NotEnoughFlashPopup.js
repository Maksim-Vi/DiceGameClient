import React from 'react';
import {Platform, useWindowDimensions} from "react-native";
import {connect, useDispatch, useSelector} from "react-redux";
import {
    selectADFlashPopup,
    setNotEnoughFlashPopup
} from "../../../redux/reducers/popups/PopupsReducer";
import {selectTranslation} from "../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../redux/reducers/language/defaultTranslation";
import styled from "styled-components";
import TextWithoutShadow from "../../../common/Text/TextWithoutShadow";
import ButtonWithText from "../../../common/Buttons/ButtonWithText";
import Text from "../../../common/Text/Text";
import ModalWrapper from "../../../common/ModalWindows/ModalWrapper";
import {store} from "../../../redux/redux-store";
import {TestIds, useInterstitialAd} from "react-native-google-mobile-ads";
import {selectMyUser} from "../../../redux/reducers/players/PlayersReducer";
import {getADFlashBonus} from "../../../protocol/API/API";
import Sounds, {soundsType} from "../../../utils/Sounds";

const NotEnoughFlashPopup = (props) => {

    const {width, height} = useWindowDimensions()
    const myUser = useSelector(selectMyUser)
    const close = useSelector(state=> selectTranslation(state, defaultTranslation.TR_CLOSE))

    const AdUnitID = Platform.OS === 'ios'
        ? process.env.APP_TYPE !== 'development' && props.ENABLE_AD_PROD && props.ENABLE_AD_IOS_PROD ? 'ca-app-pub-6421975370931679~2323680627' : TestIds.INTERSTITIAL
        : process.env.APP_TYPE !== 'development' && props.ENABLE_AD_PROD && props.ENABLE_AD_ANDROID_PROD ? 'ca-app-pub-6421975370931679/4342087577' : TestIds.INTERSTITIAL

    const { isLoaded, isClosed, load, show } = useInterstitialAd(AdUnitID, {
        requestNonPersonalizedAdsOnly: true,
    });

    const getADBonus = async () =>{
        if(myUser.id){
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

    React.useEffect(() => {
        load();
    }, [load]);

    React.useEffect(() => {
        if (isClosed) {
            getADBonus()
        }
    }, [isClosed, navigation]);

    const closePopup = () =>{
        store.dispatch(setNotEnoughFlashPopup({visible: false}))
    }

    return (
        <ModalWrapper modalBG={'default'} width={width - 35} height={height / 3} modalVisible={true}>
            <TextTitle fontSize={24} blod center color={'#fefefe'}>Oops, not enough flash</TextTitle>
            <InfoContainer>
                <TextContainer style={{borderBottomWidth: 3}}>
                    <Text setShadow={true} large blod center color={'#fefefe'}>You use all your flash!</Text>
                    <Text setShadow={true} large blod center color={'#fefefe'}>you could wait every 15m and get free 2 flash</Text>
                    {isLoaded && <Text setShadow={true} large blod center color={'#fefefe'}>or try to get flash to watch video!</Text>}
                </TextContainer>
                <ButtonContainer>
                    {isLoaded &&
                        <ButtonWithText  width={'45%'}
                                         height={'40px'}
                                         color={'rgb(255, 157, 77)'}
                                         borderColor={'rgba(0, 0, 0, 0.59)'}
                                         text={props.watchVideo}
                                         clickHandler={watchVideo}/>
                    }
                    <ButtonWithText  width={'45%'}
                                     height={'40px'}
                                     text={close !== defaultTranslation.TR_CLOSE ? close : 'close'}
                                     clickHandler={closePopup}/>
                </ButtonContainer>
            </InfoContainer>
        </ModalWrapper>
    );
};

const InfoContainer = styled.View`
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
const TextTitle = styled(TextWithoutShadow)`
  position: absolute;
  top: -30px;
  z-index: 1;
`

const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  width: 100%;
`
const mapStateToProps = (state) => ({
    watchVideo: selectTranslation(state, defaultTranslation.TR_WATCH_VIDEO),
});

export default connect(mapStateToProps)(NotEnoughFlashPopup);
