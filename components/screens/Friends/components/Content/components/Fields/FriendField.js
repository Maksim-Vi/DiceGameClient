import React from 'react';
import styled from "styled-components";
import friend_bg from "../../../../../../../assets/friends/friend_bg.png";
import Text from "../../../../../../common/Text/Text";
import Avatar from "../../../../../../common/Avatars/Avatar";
import TextWithoutShadow from "../../../../../../common/Text/TextWithoutShadow";
import ButtonWithText from "../../../../../../common/Buttons/ButtonWithText";

const FriendField = (props) => {

    const challenge = () =>{

    }

    return (
        <FriendFieldContainer>
            <ListItemBG source={friend_bg} resizeMode={'stretch'}>
                <Index large blod center>{props.index + 1}</Index>

                <Content>
                    <AvatarContainer>
                        <Avatar width={70} height={70} avatarFrame={true} avatarId={props.item.avatar}/>
                    </AvatarContainer>

                    <TextContainer>
                        <Text setShadow={true} large blod center>{props.item.username}</Text>
                        <Text setShadow={true}
                              small
                              blod
                              center
                              color={props.item.isOnline ? '#67DC54' : '#E78225'}>
                             {props.item.isOnline ? 'online' : 'offline'}
                        </Text>
                    </TextContainer>

                    <ButtonContainer>
                        <ButtonWithText width={'100px'}
                                        text={'challenge'}
                                        clickHandler={challenge} />
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

export default FriendField;