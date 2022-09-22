import React, {useState} from 'react';
import styled from "styled-components";
import Divider from "../../../common/Divider/Divider";
import {
    selectMyUser
} from "../../../redux/reducers/players/PlayersReducer";
import {connect} from "react-redux";
import TopPanelStores from "../../../common/TopPanelStores/TopPanelStores";

const ShopContainer = (props) => {

    const [activeTab,setActiveTab] = useState('coins')

    const handelActiveTab = (tab) =>{
        setActiveTab(tab)
    }

    const getTabContext = (tab) =>{
        switch (tab) {
            case 'coins': {
                break
            }
            case 'diamonds': {
                break
            }
            case 'flash': {
                break
            }
            default: return null
        }
    }

    return (
        <StoreContainer>
            <TopPanelStores coins={props.user.coins} crystals={props.user.crystals} />
            <Divider color={'white'}/>

            {getTabContext(activeTab)}
        </StoreContainer>
    );
}

const StoreContainer = styled.View`
  flex: 1;
`

const mapStateToProps = (state) => ({
    user: selectMyUser(state),
})

export default connect(mapStateToProps)(ShopContainer);
