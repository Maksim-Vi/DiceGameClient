import React, {Component} from 'react';
import Text from "../../../common/Text/Text";
import styled from "styled-components";
import {selectMyUser, selectUsersOnline} from "../../../redux/reducers/players/PlayersReducer";
import {connect} from "react-redux";

const OnlineUsers = (props) => {

    if(typeof props.usersOnline === 'number' && (props.usersOnline < 100 || !props.user.admin)) return null

    return (
        <OnlineUserContainer>
            <Text blod large center>
                online:
            </Text>
            <Text blod large center>
                {props.usersOnline}
            </Text>
        </OnlineUserContainer>

    );
}

const OnlineUserContainer = styled.View`
  position: absolute;
  bottom: -20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const mapStateToProps = (state) => ({
    user: selectMyUser(state),
    usersOnline: selectUsersOnline(state),
})

export default connect(mapStateToProps)(OnlineUsers);
