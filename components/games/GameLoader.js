import React, {useEffect} from 'react'
import GameMain from "./GameMain/GameMain";
import * as NavigationBar from "expo-navigation-bar";
import {Platform} from "react-native";
import {useBackHandler} from "@react-native-community/hooks";

const GameLoader = () => {

    const visibility = NavigationBar.useVisibility()

    const AndroidSoftwareNavHidden = async () =>{
        await NavigationBar.setPositionAsync('absolute')
        await NavigationBar.setVisibilityAsync("hidden");
        await NavigationBar.setBehaviorAsync('overlay-swipe')
        await NavigationBar.setBorderColorAsync("#00000020")
    }

    useEffect(()=>{
        if(Platform.OS === 'android'){
            if(visibility === 'visible'){
                AndroidSoftwareNavHidden()
            }
        }
    },[visibility])

    const backActionHandler = () => {
        return true;
    };

    useBackHandler(backActionHandler)

    return <GameMain />
}

export default GameLoader
