import React from 'react';
import styled from "styled-components";
import {Animated} from "react-native";
import {connect, useSelector} from "react-redux";
import {selectFriendsList} from "../../../../../redux/reducers/players/friendsSelectors";
import Text from "../../../../../common/Text/Text";
import FriendField from "./Fields/FriendField";
import {selectTranslation} from "../../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../../redux/reducers/language/defaultTranslation";

const FriendsContent = (props) => {

    const friendsList = useSelector(selectFriendsList)

    const renderItem = (data) =>{
        return <FriendField index={data.index} item={data.item}/>
    }

    const filterUsers = (list) =>{
        if(list && list.length > 0){
            return [...list].sort((a,b) => {
                return b.isOnline - a.isOnline || b.username.localeCompare(a.username)
            });
        }

        return list
    }

    if(!friendsList || friendsList.length === 0) {
        return (
            <Empty>
                <Text>{props.friendsEmpty}</Text>
            </Empty>
        )
    }

    return (
        <FriendsContainer>
            <FriendFlatList
                contentContainerStyle = {{ alignItems: 'center'}}
               // data={friendsList}
                data={filterUsers(friendsList)}
                renderItem={renderItem}
                scrollEnabled
                keyExtractor={item => item.id} />
        </FriendsContainer>
    );
};

const FriendsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  margin-top: 10px;
`

const Empty = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  width: 80%;
  height: 50px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`
const FriendFlatList = styled(Animated.FlatList)`
  width: 100%;
  height: 100%;
`

const mapStateToProps = (state) => ({
    friendsEmpty: selectTranslation(state,defaultTranslation.TR_FRIENDS_EMPTY),
})

export default connect(mapStateToProps)(FriendsContent);