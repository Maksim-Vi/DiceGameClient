import React from 'react';
import styled from "styled-components";
import search from '../../../../assets/friends/searchIc.png'

const Search = (props) => {

    const setSearchPhrase = (value) =>{
        if(props.disabledSearch) return

        props.searchHandler(value)
    }

    const handlerSearchBtn = (value) =>{
        if(props.disabledSearch) return

        props.handlerSearchBtn(value)
    }

    return (
        <SearchContainer disabled={props.disabledSearch}>
            <SearchInput
                placeholder="search..."
                maxLength={8}
                value={props.searchText}
                editable={!props.disabledSearch}
                selectTextOnFocus={!props.disabledSearch}
                onChangeText={setSearchPhrase}
            />

            <SearchBtn onPress={handlerSearchBtn}
                       disabled={props.disabledSearch}
                       activeOpacity={0.6}>
                <SearchButton source={search} resizeMode={'contain'} />
            </SearchBtn>

        </SearchContainer>
    );
};

const SearchContainer = styled.View`
  position: relative;
  display: flex;
  align-items: center;
  width: 35%;
  ${props=>{
      if(props.disabled){
        return `
           opacity: 0.6;
      `
      }
  }}
`

const SearchInput = styled.TextInput`
  width: 100%;
  height: 50px;
  margin: 10px auto;
  padding: 5px 20px;
  color: #000000;
  background-color: #d3d3d3;
  border-radius: 50px;
  justify-content: center;
  border: 2px solid rgba(44, 44, 44, 0.66);
  font-family: 'Dilo-World';
`

const SearchBtn = styled.TouchableOpacity`
  position: absolute;
  top: 23px;
  right: 10px;
`

const SearchButton = styled.Image`
  width: 25px;
  height: 25px;
`
export default Search;