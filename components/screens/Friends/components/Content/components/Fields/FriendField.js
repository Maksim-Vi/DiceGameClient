import React from 'react';
import styled from "styled-components";
import friend_bg from "../../../../../../../assets/friends/friend_bg.png";
import Text from "../../../../../../common/Text/Text";
import Avatar from "../../../../../../common/Avatars/Avatar";
import TextWithoutShadow from "../../../../../../common/Text/TextWithoutShadow";
import ButtonWithText from "../../../../../../common/Buttons/ButtonWithText";
import {TouchableWithoutFeedback} from "react-native";
import {calcLastTimeOnline, transitionState} from "../../../../../../utils/utils";
import C_SEND_GAME_INVITATION_TO_FRIEND
    from "../../../../../../protocol/messages/clients/friends/C_SEND_GAME_INVITATION_TO_FRIEND";
import {connect, useSelector} from "react-redux";
import {selectMyUser} from "../../../../../../redux/reducers/players/PlayersReducer";
import {selectTranslation} from "../../../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../../../redux/reducers/language/defaultTranslation";

const FriendField = (props) => {
    const myUser = useSelector(selectMyUser)

    const isStatusFriend = () =>{

        const lastOnlineTime = calcLastTimeOnline(props.item.lastTimeOnline)

        return (
            <StatusContainer>
                <Text setShadow={true}
                      small
                      blod
                      color={props.item.isOnline ? '#67DC54' : '#E78225'}>
                    {props.item.isOnline ? props.online : props.offline}
                </Text>
                {!props.item.isOnline && lastOnlineTime && props.item.lastTimeOnline !== '' &&
                    <Text setShadow={true} fontSize={'10'} blod color={'#E78225'}> :{lastOnlineTime}</Text>
                }
            </StatusContainer>
        )
    }

    const openFriendInfo = () =>{
        const formatItem = {
            ...props.item,
            experience: typeof props.item.experience === 'string' ? JSON.parse(props.item.experience) : props.item.experience,
            statistics: typeof props.item.statistics === 'string' ? JSON.parse(props.item.statistics) : props.item.statistics
        }
        transitionState('FriendsInfoScreen', formatItem)
    }

    const challenge = () =>{
        if(myUser.username && props.item.username){
            new C_SEND_GAME_INVITATION_TO_FRIEND(myUser.username, props.item.username)
        }
    }

    return (
        <TouchableWithoutFeedback style={{flex: 1}} onPress={openFriendInfo} accessible={false}>
            <FriendFieldContainer>
                    <ListItemBG source={friend_bg} resizeMode={'stretch'}>
                        <Index large blod center>{props.index + 1}</Index>

                        <Content>
                            <AvatarContainer>
                                <Avatar width={70} height={70} avatarFrame={true} avatarId={props.item.avatar}/>
                            </AvatarContainer>

                            <TextContainer>
                                <Text setShadow={true} large blod center>{props.item.username}</Text>
                                {isStatusFriend()}
                            </TextContainer>

                            <ButtonContainer>
                                {props.item.isOnline &&
                                    <ButtonWithText width={'100px'}
                                                    text={props.challenge}
                                                    clickHandler={challenge}/>
                                }
                            </ButtonContainer>

                        </Content>

                    </ListItemBG>
            </FriendFieldContainer>
        </TouchableWithoutFeedback>
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

const StatusContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: row;
`
const mapStateToProps = (state) => ({
    challenge: selectTranslation(state,defaultTranslation.TR_CHALLENGE_FRIEND),
    online: selectTranslation(state,defaultTranslation.TR_ONLINE),
    offline: selectTranslation(state,defaultTranslation.TR_OFFLINE),
})

export default connect(mapStateToProps)(FriendField);