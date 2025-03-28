import React from 'react';
import styled from "styled-components";
import {Animated} from "react-native";
import Text from "../../../../../common/Text/Text";
import {connect, useSelector} from "react-redux";
import {selectInvitationsFromFriends} from "../../../../../redux/reducers/players/friendsSelectors";
import FriendConfirmField from "./Fields/FriendConfirmField";
import {selectTranslation} from "../../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../../redux/reducers/language/defaultTranslation";

const ConfirmContent = (props) => {

    const inviteFriendsList = useSelector(selectInvitationsFromFriends)

    const renderItem = (data) =>{
        return <FriendConfirmField index={data.index} item={data.item}/>
    }

    if(!inviteFriendsList || inviteFriendsList.length === 0) {
        return (
            <Empty>
                <Text>{props.confirmEmpty}</Text>
            </Empty>
        )
    }

    return (
        <ConfirmContainer>
            <FriendFlatList
                contentContainerStyle = {{ alignItems: 'center'}}
                data={inviteFriendsList}
                renderItem={renderItem}
                scrollEnabled
                keyExtractor={item => item.id} />
        </ConfirmContainer>
    );
};

const ConfirmContainer = styled.View`
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
    confirmEmpty: selectTranslation(state,defaultTranslation.TR_CONFIRM_EMPTY),
})

export default connect(mapStateToProps)(ConfirmContent);