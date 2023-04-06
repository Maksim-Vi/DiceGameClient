import React, {useState} from 'react';
import SelectDropdown from "react-native-select-dropdown";
import Sounds, {soundsType} from "../../../utils/Sounds";
import {StyleSheet} from "react-native";
import styled from "styled-components";
import Text from "../../../common/Text/Text";

const selectedData = ['EN', 'UA']

const DropdownLanguage = ({language = 'EN', setLanguage}) => {

    const useSelectCheckBox = (data) =>{
        Sounds.loadAndPlayFile(soundsType.click2)
        setLanguage(data)
    }

    return  <Btn onPress={()=>{}} activeOpacity={1}>
        <Text large bold center>Language: </Text>
            <SelectDropdown data={selectedData}
                            onSelect={useSelectCheckBox}
                            defaultButtonText={language}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                            buttonStyle={styles.dropdown1BtnStyle}
                            buttonTextStyle={styles.dropdown1BtnTxtStyle}
                            dropdownStyle={styles.dropdown1DropdownStyle}
                            rowStyle={styles.dropdown1RowStyle}
                            rowTextStyle={styles.dropdown1RowTxtStyle}
                        />
    </Btn>
};

const Btn = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  width: 70%;
  margin-top: 10px;
`
const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: 130,
        height: 40,
        borderWidth: 2,
        borderColor: 'rgb(255, 157, 77)',
        borderRadius: 20,
        backgroundColor: 'rgb(79,79,79)',
    },
    dropdown1BtnTxtStyle: {
        color: '#fcfcfc',
        textAlign: 'left',
        marginLeft: 40,
        fontFamily: 'Dilo-World',
    },
    dropdown1DropdownStyle: {
        backgroundColor: 'rgba(239,239,239,0)'
    },
    dropdown1RowStyle: {
        backgroundColor: '#EFEFEF',
        borderBottomColor: '#C5C5C5'
    },
    dropdown1RowTxtStyle: {
        color: '#0c6fb6',
        textAlign: 'center',
        fontFamily: 'Dilo-World'
    },
});

export default DropdownLanguage;