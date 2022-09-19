import React, {useState} from 'react';
import styled from "styled-components";
import Text from "../../../../common/Text/Text";

const TabsCollection = (props) => {
    return (
        <Tabs>
            <TabButton tabName={'dices'}
                       activeTab={props.activeTab}
                       onPress={() => props.handelActiveTab('dices')}>
                <Text>dices</Text>
            </TabButton>
            <TabButton tabName={'squares'}
                       activeTab={props.activeTab}
                       onPress={() => props.handelActiveTab('squares')}>
                <Text>squares</Text>
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
  width: 45%;
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


export default TabsCollection;