import React from 'react';
import styled from "styled-components";
import Text from "../../../common/Text/Text";
import ButtonWithText from "../../../common/Buttons/ButtonWithText";
import {Share} from "react-native";
import {connect, useDispatch} from "react-redux";
import {setInfoPopup} from "../../../redux/reducers/popups/PopupsReducer";
import {selectTranslation} from "../../../redux/reducers/language/LanguageReducer";
import dicy from "../../../../assets/friends/dicy.png";

const ShareInfo = (props) => {

    const dispatch = useDispatch()

    const onShare = async () => {
        try {
            await Share.share({
                title: 'Knocky Dice',
                message: 'Try to play with me "Knocky Dice": awesome dice game',
                url: props.shareURL
            });
        } catch (error) {
            dispatch(setInfoPopup({
                visible: true,
                data: {text: 'Share game has error, please try later! have a good game =)'}
            }))
        }
    };

    return (
        <ShareContainer>
            <Dicy source={dicy} resizeMode={'contain'}/>
            <TextContainer>
                <Text setShadow={true} large blod center>{props.inviteText}</Text>
                <Text setShadow={true} medium blod center>{props.inviteTextDesc}</Text>
            </TextContainer>
            <ButtonWithText clickHandler={onShare} text={props.inviteText}/>
        </ShareContainer>
    );
};

const ShareContainer = styled.View`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  margin-top: 20px;
  width: 90%;
  height: 100px;
  background: rgba(0, 0, 0, 0.17);
  border-radius: 20px;
`

const TextContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const Dicy = styled.Image`
  position: absolute;
  bottom: 0;
  left: -15px;
  width: 130px;
  height: 100px;
  z-index: 1;
`

const mapStateToProps = (state) => ({
    shareURL: selectTranslation(state,'SHARE_GAME_URL'),
    inviteText: selectTranslation(state,'TR_INVITE_FRIENDS'),
    inviteTextDesc: selectTranslation(state,'TR_INVITE_FRIENDS_DESC'),
})

export default connect(mapStateToProps)(ShareInfo);