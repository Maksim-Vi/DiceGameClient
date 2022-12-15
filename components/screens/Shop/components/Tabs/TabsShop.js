import React from 'react';
import styled from "styled-components";
import Text from "../../../../common/Text/Text";

const TabsShop = (props) => {
    return (
        <Tabs>
            <TabButton tabName={'coins'}
                       activeTab={props.activeTab}
                       onPress={() => props.handelActiveTab('coins')}>
                <Text>coins</Text>
            </TabButton>
            <TabButton tabName={'diamonds'}
                       activeTab={props.activeTab}
                       onPress={() => props.handelActiveTab('diamonds')}>
                <Text>diamonds</Text>
            </TabButton>
            <TabButton tabName={'flash'}
                       activeTab={props.activeTab}
                       onPress={() => props.handelActiveTab('flash')}>
                <Text>flash</Text>
            </TabButton>
        </Tabs>
    );
}

const Tabs = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 100%;
  height: 35px;
  background-color: rgb(1,1,70);
`
const TabButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 33%;
  height: 80%;
  border-radius: 10px;
  ${(props)=>{
    if(props.activeTab === props.tabName){
        return `
            background-color: rgba(16, 129, 176, 0.86);
        `
    }
}}
  
`


export default TabsShop;