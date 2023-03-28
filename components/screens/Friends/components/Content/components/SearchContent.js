import React from 'react';
import styled from "styled-components";
import FriendSearchField from "./Fields/FriendSearchField";
import {Animated} from "react-native";
import Text from "../../../../../common/Text/Text";
import {selectTranslation} from "../../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../../redux/reducers/language/defaultTranslation";
import {connect} from "react-redux";

const SearchContent = (props) => {

    const renderItem = (data) =>{
        return <FriendSearchField index={data.index} item={data.item}/>
    }

    if(!props.searchData || props.searchData === null) {
        return (
            <Empty>
                <Text>{props.searchEmpty}</Text>
            </Empty>
        )
    }

    return (
        <SearchContainer>
            <FriendFlatList
                contentContainerStyle = {{ alignItems: 'center'}}
                data={props.searchData}
                renderItem={renderItem}
                scrollEnabled
                keyExtractor={(item, index) => index} />
        </SearchContainer>
    );
};
const SearchContainer = styled.View`
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
    searchEmpty: selectTranslation(state,defaultTranslation.TR_SEARCH_EMPTY),
})

export default connect(mapStateToProps)(SearchContent);