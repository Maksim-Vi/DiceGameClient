import React from 'react';
import styled from "styled-components";
import friend_bg from "../../../../../../../assets/friends/friend_bg.png";
import Text from "../../../../../../common/Text/Text";
import Avatar from "../../../../../../common/Avatars/Avatar";
import TextWithoutShadow from "../../../../../../common/Text/TextWithoutShadow";
import ButtonWithText from "../../../../../../common/Buttons/ButtonWithText";
import C_SEND_FRIEND_INVITATION from "../../../../../../protocol/messages/clients/friends/C_SEND_FRIEND_INVITATION";
import {connect, useSelector} from "react-redux";
import {selectMyUser} from "../../../../../../redux/reducers/players/PlayersReducer";
import {selectFriendsList, selectInvitationsToFriends} from "../../../../../../redux/reducers/players/friendsSelectors";
import C_DELETE_FRIEND_INVITATION from "../../../../../../protocol/messages/clients/friends/C_DELETE_FRIEND_INVITATION";
import {selectTranslation} from "../../../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../../../redux/reducers/language/defaultTranslation";

const FriendSearchField = (props) => {

    const myUser = useSelector(selectMyUser)
    const myFriends = useSelector(selectFriendsList)
    const myInvitation = useSelector(selectInvitationsToFriends)

    const checkIsUserAlreadyInvitation = () =>{
        const isInvite = myInvitation.find(item=> item.receiverUsername === props.item.username)
        const isFriend = myFriends.find(item=> item.username === props.item.username)

        return {
            inviteData: isInvite,
            btnText: isInvite && !isInvite.isAccepted ? props.invited : props.invite,
            isInvite: isInvite && !isInvite.isAccepted,
            isFriend: !!isFriend || props.item.username === myUser.username,
        }
    }

    const invite = () =>{
        if(myUser.username && props.item.username){
            if(checkIsUserAlreadyInvitation().isInvite){
                const inviteData = checkIsUserAlreadyInvitation().inviteData
                return new C_DELETE_FRIEND_INVITATION(myUser.username, props.item.username, inviteData.id)
            }
            new C_SEND_FRIEND_INVITATION(myUser.username, props.item.username)
        }
    }

    return (
        <FriendFieldContainer>
            <ListItemBG source={friend_bg} resizeMode={'stretch'}>
                <Index large blod center>{props.index + 1}</Index>

                <Content>
                    <AvatarContainer>
                        <Avatar width={70} height={70} avatarFrame={true} avatarId={props.item && props.item.avatar}/>
                    </AvatarContainer>

                    <TextContainer>
                        <Text setShadow={true} large blod center>{props.item.username}</Text>
                        <Text setShadow={true}
                              small
                              blod
                              center
                              color={props.item.isOnline ? '#67DC54' : '#E78225'}>
                            {props.item.isOnline ? props.online : props.offline}
                        </Text>
                    </TextContainer>

                    <ButtonContainer>
                        {!checkIsUserAlreadyInvitation().isFriend &&
                            <ButtonWithText width={'100px'}
                                            text={checkIsUserAlreadyInvitation().btnText}
                                            color={checkIsUserAlreadyInvitation().isInvite ? 'rgb(255, 157, 77)' : '#5eba7d;'}
                                            borderColor={checkIsUserAlreadyInvitation().isInvite ? 'rgb(37,37,37)' : 'rgb(255, 157, 77);'}
                                            clickHandler={invite} />
                        }
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
  flex-direction: row;
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
    friendsEmpty: selectTranslation(state,defaultTranslation.TR_FRIENDS_EMPTY),
    online: selectTranslation(state,defaultTranslation.TR_ONLINE),
    offline: selectTranslation(state,defaultTranslation.TR_OFFLINE),
    invite: selectTranslation(state,defaultTranslation.TR_INVITE_FRIEND),
    invited: selectTranslation(state,defaultTranslation.TR_INVITED_FRIEND),
})

export default connect(mapStateToProps)(FriendSearchField);