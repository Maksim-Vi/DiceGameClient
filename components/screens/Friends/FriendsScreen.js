import React, {memo, useEffect, useState} from 'react';
import styled from "styled-components";
import BackgroundWrapper from "../../common/BackgroundWrapper/BackgroundWrapper";
import ButtonBack from "../../common/Buttons/Back/ButtonBack";
import {getIosModel} from "../../utils/utils";
import {Platform} from "react-native";
import FriendsTitle from "./components/FriendsTitle";
import ShareInfo from "./components/ShareInfo";
import Text from "../../common/Text/Text";
import line from "../../../assets/friends/line.png";
import TabContentContainer from "./components/TabContent/TabContentContainer";
import ContentContainer from "./components/Content/ContentContainer";
import {searchFriendsApi} from "../../protocol/API/API";
import {useSelector} from "react-redux";
import {selectMyUser} from "../../redux/reducers/players/PlayersReducer";

export const tabs = {
    added: 'added',
    confirm: 'confirm',
    search: 'search'
}

const titleTab = {
    added: 'friends',
    confirm: 'confirm friends',
    search: 'search friends'
}

const FriendsScreen = (props) => {

    let interval = null
    let searchCount = 0
    const myUser = useSelector(selectMyUser)
    const [friendsData, setFriendsData] = useState({
        title: titleTab.added,
        tabName: tabs.added,
        searchText: '',
        searchData: null
    })

    const changeTab = (newTab) =>{
        setFriendsData({...friendsData, tabName: newTab, title: titleTab[newTab]})
    }

    const searchHandler = (search) =>{
        setFriendsData({
            ...friendsData,
            searchText: search,
            searchData: search.length > 0 ? friendsData.searchData : null
        })
    }

    const searchPlayers = () =>{
        if(friendsData.tabName === tabs.search && friendsData.searchText.length >= 1){
            searchFriends(friendsData.searchText)
        }
    }

    const searchFriends = (searchText) =>{
        if (searchText.length >= 1) {
            if(myUser && searchText !== myUser.username){
                searchFriendsApi(searchText).then((res)=>{
                    setFriendsData({
                        ...friendsData,
                        searchData: res
                    })
                })
            }
        } else {
            setFriendsData({
                ...friendsData,
                searchData: null
            })
        }
    }

    return (
        <BackgroundWrapper>
            <ButtonBack top={'3%'} goMainPage={true}/>
            <FriendsContainer>
                <FriendsTitle />
                <ShareInfo />

                <Line source={line} style={{right: 2}} resizeMode={'contain'}/>
                <Friends>
                    <Text setShadow={true} large blod center>{friendsData.title}</Text>
                    <TabContentContainer active={friendsData.tabName}
                                         changeTab={changeTab}
                                         searchText={friendsData.searchText}
                                         handlerSearchBtn={searchPlayers}
                                         searchHandler={searchHandler}/>
                    <ContentContainer type={friendsData.tabName}
                                      searchText={friendsData.searchText}
                                      searchData={friendsData.searchData} />
                </Friends>
                <Line source={line} style={{left: 2}} resizeMode={'contain'}/>
            </FriendsContainer>
        </BackgroundWrapper>
    )
}

const FriendsContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  margin-top: 25%;
  ${()=>{
    const isIos = getIosModel()
    if (Platform.OS === 'ios' && isIos >= 10) {
        return `
        margin-top: 25%;
      `
    } else {
        return `margin-top: 5%;`
    }
}}
`

const Friends = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  margin-top: 30px;
`


const Line = styled.Image`
  position: absolute;
  width: 10px;
  height: 100%;
`

export default memo(FriendsScreen);