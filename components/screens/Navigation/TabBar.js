import styled from "styled-components";
import mainIcon from '../../../assets/nav/main.png'
import shopIcon from '../../../assets/nav/shop.png'
import collectionsIcon from '../../../assets/nav/collections.png'
import chatIcon from '../../../assets/nav/chat.png'
import Text from "../../common/Text/Text";
import { NativeModules, Platform } from "react-native";

export default TabBar = ({ state, navigation }) => {

  const onPress = (route, isFocused) => {
    // const event = navigation.emit({
    //   type: "tabPress",
    //   target: route.key,
    //   canPreventDefault: true,
    // });

    // if (!isFocused && !event.defaultPrevented) {
    //   navigation.navigate({ name: route.name, merge: true });
    // }

    if (!isFocused) {
      navigation.navigate({ name: route.name, merge: true });
    }
  };

  const getIconName = (route) => {
    switch (route.name) {
      case "MainScreen": return mainIcon;
      case "ShopScreen": return shopIcon;
      case "CollectionsScreen": return collectionsIcon;
      case "ChatScreen": return chatIcon;
      default: return startGameIcon
    }
  };
  const getText = (route) => {
    switch (route.name) {
      case "MainScreen": return 'Home';
      case "ShopScreen": return 'Shop';
      case "CollectionsScreen": return 'Collection';
      case "ChatScreen": return 'Chat';

      default: return 'Home'
    }
  };

  return (
    <TabsContainer>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
      
        return (
          <TabIconContainer key={index} focused={isFocused} onPress={() => onPress(route, isFocused)}>
            <NavImage source={getIconName(route)} />
            <Text heavy medium color={'#ff9d4d'}>{getText(route)}</Text>
            {isFocused &&
              <Active style={{ borderTopWidth: 4, borderBottomWidth: 0 }}/>
            }
          </TabIconContainer>
        );
      })}
    </TabsContainer>
  );
};

const TabsContainer = styled.View`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
  width: 100%;
  ${()=>{
    if(Platform.OS === 'ios' && NativeModules.DeviceInfo.isIPhoneX_deprecated){
      return `
        height: 70px;
      `
    } else {
      return `
        height: 50px;
      `
    }
  }}
`;

const TabIconContainer = styled.TouchableOpacity`
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  ${()=>{
    if(Platform.OS === 'ios' && NativeModules.DeviceInfo.isIPhoneX_deprecated){
      return `
        margin-bottom: 20px;
      `
    } else {
      return `
        margin-bottom: 10px;
      `
    }
  }}
`;

const NavImage = styled.Image`
  width: 55px;
  height: 55px;
`;

const Active = styled.View`
  position: absolute;
  top: -10px;
  width: 70px;
  height: 500px;
  background-color: rgba(220, 220, 220, 0.1);
  border: 2px solid rgba(229, 229, 229, 0.5);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
