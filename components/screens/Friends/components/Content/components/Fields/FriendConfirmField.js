import React from 'react';
import styled from "styled-components";
import friend_bg from "../../../../../../../assets/friends/friend_bg.png";
import Text from "../../../../../../common/Text/Text";
import Avatar from "../../../../../../common/Avatars/Avatar";
import TextWithoutShadow from "../../../../../../common/Text/TextWithoutShadow";
import ButtonWithText from "../../../../../../common/Buttons/ButtonWithText";
import C_ACCEPT_FRIEND_INVITATION from "../../../../../../protocol/messages/clients/friends/C_ACCEPT_FRIEND_INVITATION";
import C_DECLINE_FRIEND_INVITATION
    from "../../../../../../protocol/messages/clients/friends/C_DECLINE_FRIEND_INVITATION";
import {selectTranslation} from "../../../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../../../redux/reducers/language/defaultTranslation";
import {connect} from "react-redux";
import constants from '../../../../../../constants/constants';

const FriendConfirmField = (props) => {

    const confirm = () =>{
        if(props.item){
            new C_ACCEPT_FRIEND_INVITATION(props.item.receiverUsername, props.item.senderUsername, props.item.id)
        }
    }

    const decline = () =>{
        if(props.item) {
            new C_DECLINE_FRIEND_INVITATION(props.item.receiverUsername, props.item.senderUsername, props.item.id)
        }
    }

    const getUser = () =>{
    
      const activeItems = typeof props.item.activeItemsSender === 'string' 
        ? JSON.parse(props.item.activeItemsSender) 
        : props.item.activeItemsSender

      return {
        username: props.item.senderUsername || "",
        activeItems: activeItems || constants.defaultActiveItems
      }
    }

    return (
        <FriendFieldContainer>
            <ListItemBG source={friend_bg} resizeMode={'stretch'}>
                <Index large blod center>{props.index + 1}</Index>

                <Content>
                    <AvatarContainer>
                        <Avatar width={70} height={70} avatarFrame={true} user={getUser()} avatarId={props.item && props.item.avatarSender}/>
                    </AvatarContainer>

                    <TextContainer>
                        <Text setShadow={true} large blod center>{props.item.senderUsername}</Text>
                    </TextContainer>

                    <ButtonContainer>
                        <ButtonWithText width={'100px'}
                                        text={props.confirmText}
                                        clickHandler={confirm} />
                        <ButtonWithText width={'100px'}
                                        text={props.declineText}
                                        color={'#d34b2d'}
                                        clickHandler={decline} />
                    </ButtonContainer>

                </Content>


            </ListItemBG>
        </FriendFieldContainer>
    );
};

const FriendFieldContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 90%;
  height: 100px;
  margin-top: 10px;
`

const ListItemBG = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

const Content = styled.View`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: 95%;
  height: 100%;
  padding: 20px;
`

const Index = styled(TextWithoutShadow)`
  width: 10%;
  height: auto;
`

const TextContainer = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  align-self: flex-start;
  width: 50%;
  margin-left: 10px;
`

const ButtonContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-left: auto;
`

const AvatarContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 60px;
  height: 60px;
`

const mapStateToProps = (state) => ({
    confirmText: selectTranslation(state,defaultTranslation.TR_CONFIRM_FRIEND),
    declineText: selectTranslation(state,defaultTranslation.TR_DECLINE_FRIEND),
})

export default connect(mapStateToProps)(FriendConfirmField);