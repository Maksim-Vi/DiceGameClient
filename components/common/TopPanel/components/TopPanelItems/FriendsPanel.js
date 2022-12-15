import React from 'react';
import ButtonWithImage from "../../../Buttons/ButtonWithImage";
import settings from "../../../../../assets/topPanel/friends.png";
import {useNavigation} from "@react-navigation/native";

const FriendsPanel = (props) => {

    const navigaion = useNavigation()

    const openFriendsPopup = () => {
        navigaion.navigate('FriendsScreen')
    }

    return <ButtonWithImage color={'rgba(13, 64, 194, 0.88)'}
                            width={45}
                            height={45}
                            borderColor={'#fff0'}
                            padding={0}
                            clickHandler={() => openFriendsPopup()}
                            image={settings}/>
}

export default FriendsPanel;