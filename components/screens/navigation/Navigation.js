import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions, tabsScreenOptions } from "../../constants/options";
import CollectionsScreen from "../collections/CollectionsScreen";
import GameScreen from "../Game/GameScreen";
import LoadingGameScreen from "../LoadingGameScreen/LoadingGameScreen";
import MainScreen from "../Main/MainScreen";
import ShopScreen from "../shop/ShopScreen";
import TabBar from "./TabBar";
import ResultScreen from "../ResultScreen/ResultScreen";
import React from "react";

const AppStack = createStackNavigator();
const TabsNav = createBottomTabNavigator();

const TabNavScreen = () => {
  return (
    <TabsNav.Navigator initialRouteName="MainScreen" screenOptions={tabsScreenOptions} tabBar={props => <TabBar {...props} />}>
      <TabsNav.Screen name="ShopScreen" component={ShopScreen} />
      <TabsNav.Screen name="MainScreen" component={MainScreen} />
      <TabsNav.Screen name="CollectionsScreen" component={CollectionsScreen} />
    </TabsNav.Navigator>
  );
};

export default function Navigator() {

  return (
    <AppStack.Navigator screenOptions={screenOptions} >
      <AppStack.Screen name="App" component={TabNavScreen} />
      <AppStack.Screen name="GameScreen" component={GameScreen} />
      <AppStack.Screen name="ResultScreen" component={ResultScreen} />
      <AppStack.Screen name="LoadingGameScreen" component={LoadingGameScreen} />
    </AppStack.Navigator>
  );
}
