import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createStackNavigator, HeaderStyleInterpolators} from "@react-navigation/stack";
import { screenOptions, tabsScreenOptions } from "../../constants/options";
import CollectionsScreen from "../Collections/CollectionsScreen";
import GameScreen from "../Game/GameScreen";
import LoadingGameScreen from "../LoadingGameScreen/LoadingGameScreen";
import MainScreen from "../Main/MainScreen";
import ResultScreen from "../ResultScreen/ResultScreen";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import RoadScreen from "../Road/RoadScreen";
import ChatScreen from "../Chat/ChatScreen";
import FriendsScreen from "../Friends/FriendsScreen";
import TabBar from "./TabBar";

const options = {
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
}

const optionsGame = {
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
}

const AppStack = createStackNavigator();
const TabsNav = createBottomTabNavigator();

const TabNavScreen = () => {
  return (
    <TabsNav.Navigator initialRouteName="MainScreen" screenOptions={tabsScreenOptions} tabBar={props => <TabBar {...props} />}>
      {/*<TabsNav.Screen name="ShopScreen" component={ShopScreen} />*/}
        <TabsNav.Screen name="CollectionsScreen" component={CollectionsScreen} />
        <TabsNav.Screen name="MainScreen" component={MainScreen} />
        <TabsNav.Screen name="ChatScreen" component={ChatScreen} />
    </TabsNav.Navigator>
  );
};

export default function Navigator() {

  const navigation = useNavigation()

  React.useEffect(()=>{
    window.navigation = navigation
  }, [navigation])


  return (
    <AppStack.Navigator screenOptions={screenOptions} >
      <AppStack.Screen options={options} name="App" component={TabNavScreen} />
      <AppStack.Screen options={optionsGame} name="GameScreen" component={GameScreen} />
      <AppStack.Screen options={options} name="ResultScreen" component={ResultScreen} />
      <AppStack.Screen options={options} name="LoadingGameScreen" component={LoadingGameScreen} />
      <AppStack.Screen options={options} name="RoadScreen" component={RoadScreen} />
      <AppStack.Screen options={options} name="FriendsScreen" component={FriendsScreen} />
    </AppStack.Navigator>
  );
}
