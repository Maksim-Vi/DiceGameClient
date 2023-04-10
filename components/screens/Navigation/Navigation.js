import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator, HeaderStyleInterpolators} from "@react-navigation/stack";
import {screenOptions, tabsScreenOptions} from "../../constants/options";
import CollectionsScreen from "../Collections/CollectionsScreen";
import GameScreen from "../Game/GameScreen";
import LoadingGameScreen from "../LoadingGameScreen/LoadingGameScreen";
import MainScreen from "../Main/MainScreen";
import ResultScreen from "../ResultScreen/ResultScreen";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import RoadScreen from "../Road/RoadScreen";
import ChatScreen from "../Chat/ChatScreen";
import FriendsScreen from "../Friends/FriendsScreen";
import TabBar from "./TabBar";
import UserInfoScreen from "../UserInfo/UserInfoScreen";
import AuthScreen from "../Auth/AuthScreen";
import RegisterScreen from "../Auth/Register/RegisterScreen";
import LoadingProject from "../LoadingProject/LoadingProject";
import Load from "../LoadingProject/Load";
import {useSelector} from "react-redux";
import {selectDefaultParams} from "../../redux/reducers/language/LanguageReducer";
import defaultParams from "../../redux/reducers/language/defaultParams";
import ShopScreen from "../Shop/ShopScreen";
import FriendsInfoScreen from "../UserInfo/FriendsInfoScreen";
import LoadingInvitationGameScreen from "../LoadingGameScreen/LoadingInvitationGameScreen";

const options = {
    presentation: 'transparentModal'
}

const AppStack = createStackNavigator();
const TabsNav = createBottomTabNavigator();

const TabNavScreen = () => {
    const ENABLE_COLLECTIONS = useSelector(state => selectDefaultParams(state, defaultParams.ENABLE_COLLECTIONS))
    const ENABLE_SHOP = useSelector(state => selectDefaultParams(state, defaultParams.ENABLE_SHOP))
    const ENABLE_CHAT = useSelector(state => selectDefaultParams(state, defaultParams.ENABLE_CHAT))

    return (
        <TabsNav.Navigator initialRouteName="MainScreen" screenOptions={tabsScreenOptions} tabBar={props => <TabBar {...props} />}>
            {ENABLE_SHOP && <TabsNav.Screen name="ShopScreen" component={ShopScreen}/>}
            {ENABLE_COLLECTIONS && <TabsNav.Screen name="CollectionsScreen" component={CollectionsScreen}/>}
            <TabsNav.Screen name="MainScreen" component={MainScreen}/>
            {ENABLE_CHAT && <TabsNav.Screen name="ChatScreen" component={ChatScreen}/>}
        </TabsNav.Navigator>
    );
};

export default function Navigator() {

    const navigation = useNavigation()

    React.useEffect(() => {
        window.navigation = navigation
    }, [navigation])


    return (
        <AppStack.Navigator screenOptions={screenOptions}>
            <AppStack.Screen options={options} name="Load" component={Load}/>

            <AppStack.Screen name="AuthScreen" component={AuthScreen}/>
            <AppStack.Screen name="RegisterScreen" component={RegisterScreen}/>
            <AppStack.Screen name="LoadingProject" component={LoadingProject}/>

            <AppStack.Screen options={options} name="App" component={TabNavScreen}/>
            <AppStack.Screen options={options} name="GameScreen" component={GameScreen}/>
            <AppStack.Screen options={options} name="ResultScreen" component={ResultScreen}/>
            <AppStack.Screen options={options} name="LoadingGameScreen" component={LoadingGameScreen}/>
            <AppStack.Screen options={options} name="LoadingInvitationGameScreen" component={LoadingInvitationGameScreen}/>
            <AppStack.Screen options={options} name="RoadScreen" component={RoadScreen}/>
            <AppStack.Screen options={options} name="FriendsScreen" component={FriendsScreen}/>
            <AppStack.Screen options={options} name="UserInfoScreen" component={UserInfoScreen}/>
            <AppStack.Screen options={options} name="FriendsInfoScreen" component={FriendsInfoScreen}/>
        </AppStack.Navigator>
    );
}
