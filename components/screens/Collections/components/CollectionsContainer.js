import React, {useState} from 'react';
import styled from "styled-components";
import TabsCollection from "./tabs/TabsCollection";
import Divider from "../../../common/Divider/Divider";
import {
    selectActiveItems,
    selectMyUser
} from "../../../redux/reducers/players/PlayersReducer";
import {connect} from "react-redux";
import DicesTab from "./dicesTab/DicesTab";
import SquaresTab from "./squaresTab/SquaresTab";
import {selectAvailableCollectionItems, selectGameItems} from "../../../redux/reducers/collections/CollectionsReducer";
import TopPanelStores from "../../../common/TopPanelStores/TopPanelStores";
import Sounds, {soundsType} from "../../../utils/Sounds";

const CollectionsContainer = (props) => {

    const [activeTab,setActiveTab] = useState('dices')

    const handelActiveTab = (tab) =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        setActiveTab(tab)
    }

    const getTabContext = (tab) =>{
        switch (tab) {
            case 'dices': {
                return <DicesTab dices={props.gameItems.Dices}
                                 activeItems={props.activeItems}
                                 availableItems={props.availableItems}/>
            }
            case 'squares': {
                return <SquaresTab squares={props.gameItems.SquaresGame}
                                   activeItems={props.activeItems}
                                   availableItems={props.availableItems}/>
            }
            default: return null
        }
    }

    return (
        <CollectionContainer>
            <TopPanelStores coins={props.user.coins} crystals={props.user.crystals} />
            <Divider color={'white'}/>
            <TabsCollection activeTab={activeTab} handelActiveTab={handelActiveTab}/>

            {getTabContext(activeTab)}
        </CollectionContainer>
    );
}

const CollectionContainer = styled.View`
  flex: 1;
`

const mapStateToProps = (state) => ({
    user: selectMyUser(state),
    activeItems: selectActiveItems(state),
    availableItems: selectAvailableCollectionItems(state),
    gameItems: selectGameItems(state),
})

export default connect(mapStateToProps)(CollectionsContainer);
