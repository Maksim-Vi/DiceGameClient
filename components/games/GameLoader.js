import React, {useEffect} from 'react'
import GameMain from "./GameMain/GameMain";
import * as NavigationBar from "expo-navigation-bar";
import {Platform} from "react-native";

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

    return <GameMain />
}

export default GameLoader
