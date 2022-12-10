import styled from "styled-components";
import mainIcon from '../../../assets/nav/main.png'
import shopIcon from '../../../assets/nav/shop.png'
import collectionsIcon from '../../../assets/nav/collections.png'
import chatIcon from '../../../assets/nav/chat.png'
import Text from "../../common/Text/Text";
import { NativeModules, Platform } from "react-native";

export default TabBar = ({ state, navigation }) => {
  const onPress = (route, isFocused) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
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
          </TabIconContainer>
        );
      })}
    </TabsContainer>
  );
};

const TabsContainer = styled.View`
  background-color: rgb(1,1,70);
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
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
  align-items: center;
  text-align: center;
  ${()=>{
    if(Platform.OS === 'ios' && NativeModules.DeviceInfo.isIPhoneX_deprecated){
      return `
        margin-bottom: 30px;
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
