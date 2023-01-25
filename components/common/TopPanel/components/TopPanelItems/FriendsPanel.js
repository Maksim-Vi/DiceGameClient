import React from 'react';
import ButtonWithImage from "../../../Buttons/ButtonWithImage";
import settings from "../../../../../assets/topPanel/friends.png";
import {useNavigation} from "@react-navigation/native";
import {Alert} from "react-native";
import {setInfoPopup} from "../../../../redux/reducers/popups/PopupsReducer";
import {useDispatch} from "react-redux";
import Sounds, {soundsType} from "../../../../utils/Sounds";

const FriendsPanel = (props) => {

    const dispatch = useDispatch()

    const openFriendsPopup = () => {
        Sounds.loadAndPlayFile(soundsType.click2)
        dispatch(setInfoPopup({visible: true, data: {text: 'Friends will be available after some time. Have a good game!'}}))
        //navigaion.navigate('FriendsScreen')
    }

    return <ButtonWithImage color={'rgb(1,1,70)'}
                            width={45}
                            height={45}
                            borderColor={'#fff0'}
                            padding={0}
                            clickHandler={() => openFriendsPopup()}
                            image={settings}/>
}

export default FriendsPanel;