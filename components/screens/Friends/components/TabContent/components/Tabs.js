import React from 'react';
import styled from "styled-components";
import ButtonTab from "./ButtonTab";
import friends from "../../../../../../assets/topPanel/friends.png";
import add from "../../../../../../assets/friends/add.png";
import search from "../../../../../../assets/friends/search.png";
import {tabs} from "../../../FriendsScreen";
import {useSelector} from "react-redux";
import {selectInvitedCount} from "../../../../../redux/reducers/players/friendsSelectors";
import InfoButton from "../../../../../common/Info/InfoButton";

const Tabs = (props) => {

    const invitedCount = useSelector(selectInvitedCount)
    const handlerTab = (newTab) =>{
         props.changeTab(newTab)
    }

    return (
        <TabsContainer>
            <ButtonTab width={50}
                       height={50}
                       btnWidth={20}
                       btnHeight={40}
                       clickHandler={()=> handlerTab(tabs.added)}
                       color={props.active === tabs.added ? 'rgb(255, 157, 77)' : '#5eba7d;'}
                       borderColor={props.active  === tabs.added  ? 'rgb(37,37,37)' : 'rgb(255, 157, 77);'}
                       image={friends}/>
            <ConfirmBtnContainer>
                {invitedCount > 0 && <InfoButton count={invitedCount}/>}
                <ButtonTab width={50}
                           height={50}
                           btnWidth={20}
                           btnHeight={20}
                           clickHandler={()=> handlerTab(tabs.confirm)}
                           color={props.active === tabs.confirm ? 'rgb(255, 157, 77)' : '#5eba7d;'}
                           borderColor={props.active  === tabs.confirm  ? 'rgb(37,37,37)' : 'rgb(255, 157, 77);'}
                           image={add}/>
            </ConfirmBtnContainer>
            <ButtonTab width={50}
                       height={50}
                       btnWidth={20}
                       btnHeight={20}
                       clickHandler={()=> handlerTab(tabs.search)}
                       color={props.active === tabs.search ? 'rgb(255, 157, 77)' : '#5eba7d;'}
                       borderColor={props.active  === tabs.search  ? 'rgb(37,37,37)' : 'rgb(255, 157, 77);'}
                       image={search}/>
        </TabsContainer>
    );
};

const TabsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 55%;
  height: 50px;
`

const ConfirmBtnContainer = styled.View`
  position: relative;
`


export default Tabs;