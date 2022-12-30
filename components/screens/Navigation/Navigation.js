import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
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
      <AppStack.Screen name="App" component={TabNavScreen} />
      <AppStack.Screen name="GameScreen" component={GameScreen} />
      <AppStack.Screen name="ResultScreen" component={ResultScreen} />
      <AppStack.Screen name="LoadingGameScreen" component={LoadingGameScreen} />
      <AppStack.Screen name="RoadScreen" component={RoadScreen} />
      <AppStack.Screen name="FriendsScreen" component={FriendsScreen} />
    </AppStack.Navigator>
  );
}
