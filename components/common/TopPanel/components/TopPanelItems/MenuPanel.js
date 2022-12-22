import React from 'react';
import settings from '../../../../../assets/topPanel/settings.png'
import ButtonWithImage from "../../../Buttons/ButtonWithImage";
import {useDispatch} from "react-redux";
import {setSettingsMenuPopup} from "../../../../redux/reducers/popups/PopupsReducer";

const MenuPanel = (props) => {

    const dispatch = useDispatch()

    const openSettingsPopup = () =>{
        dispatch(setSettingsMenuPopup({visible: true, data: null}))
    }

    return <ButtonWithImage color={'rgb(1,1,70)'}
                            width={45}
                            height={45}
                            borderColor={'#fff0'}
                            padding={0}
                            clickHandler={()=>{openSettingsPopup()}}
                            image={settings}/>
}

export default MenuPanel;