import React from 'react';
import styled from "styled-components";
import {Animated} from "react-native";
import {useSelector} from "react-redux";
import {selectFriendsList} from "../../../../../redux/reducers/players/friendsSelectors";
import Text from "../../../../../common/Text/Text";
import FriendField from "./Fields/FriendField";

const FriendsContent = () => {

    const friendsList = useSelector(selectFriendsList)

    const renderItem = (data) =>{
        return <FriendField index={data.index} item={data.item}/>
    }

    const filterUsers = (list) =>{
        return list.sort((a, b) => Number(b.isOnline) - Number(a.isOnline));
    }

    if(!friendsList || friendsList.length === 0) {
        return (
            <Empty>
                <Text>Find your friends!</Text>
            </Empty>
        )
    }

    return (
        <FriendsContainer>
            <FriendFlatList
                contentContainerStyle = {{ alignItems: 'center'}}
                data={friendsList}
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
export default FriendsContent;