import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { selectMyUser } from '../../redux/reducers/players/PlayersReducer'
import { selectAvatarPopup } from '../../redux/reducers/popups/PopupsReducer'
import AvatarPopups from './AvatarPopups/AvatarPopups'

const PopupsManager = (props) =>{

  return <PopupConteiner>
      {props.avatarPopup.visible && <AvatarPopups user={props.user}/>}
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
  user: selectMyUser(state),
});

export default connect(mapStateToProps)(PopupsManager);