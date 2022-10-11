import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { selectMyUser } from '../../redux/reducers/players/PlayersReducer'
import { selectAvatarPopup, selectTestBtnsPopup } from '../../redux/reducers/popups/PopupsReducer'
import AvatarPopups from './AvatarPopups/AvatarPopups'
import {StatusBar} from "react-native";
import TestBtnsPopups from './AvatarPopups/TestBtnsPopups'

const PopupsManager = (props) =>{

  return <PopupConteiner>
    <StatusBar hidden={true} style="light"/>

    {props.avatarPopup.visible && <AvatarPopups user={props.user}/>}


    {props.testBtnsPopup.visible && <TestBtnsPopups />}
  </PopupConteiner>
}

const PopupConteiner = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
`

const mapStateToProps = (state) => ({
  avatarPopup: selectAvatarPopup(state),
  testBtnsPopup: selectTestBtnsPopup(state),
  user: selectMyUser(state),
});

export default connect(mapStateToProps)(PopupsManager);