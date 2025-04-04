import React, {useState} from 'react';
import styled from "styled-components";
import Divider from "../../../common/Divider/Divider";
import {
    selectMyUser
} from "../../../redux/reducers/players/PlayersReducer";
import {connect} from "react-redux";
import TopPanelStores from "../../../common/TopPanelStores/TopPanelStores";
import TabsShop from "./Tabs/TabsShop";
import FlashTab from "./FlashTab/FlashTab";
import DiamondsTab from "./DiamondsTab/DiamondsTab";
import CoinsTab from "./CoinsTab/CoinsTab";
import Text from '../../../common/Text/Text';

const ShopContainer = (props) => {

    const [activeTab,setActiveTab] = useState('coins')

    const handelActiveTab = (tab) =>{
        setActiveTab(tab)
    }

    const getTabContext = (tab) =>{
        switch (tab) {
            case 'coins': return <CoinsTab user={props.user}/>
            case 'diamonds': return <DiamondsTab user={props.user}/>
            case 'flash': return <FlashTab user={props.user}/>
            default: return null
        }
    }

    React.useEffect(()=>{
        return () =>{
            setActiveTab('coins')
        }
    }, [])


    return (
        <StoreContainer>
            <TopPanelStores coins={props.user.coins} crystals={props.user.crystals} />
            <Divider color={'white'}/>
            <TabsShop activeTab={activeTab} handelActiveTab={handelActiveTab}/>

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
