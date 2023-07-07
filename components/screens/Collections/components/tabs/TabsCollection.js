import React from 'react';
import styled from "styled-components";
import Text from "../../../../common/Text/Text";
import {selectTranslation} from "../../../../redux/reducers/language/LanguageReducer";
import defaultTranslation from "../../../../redux/reducers/language/defaultTranslation";
import {connect} from "react-redux";

const TabsCollection = (props) => {
    return (
        <Tabs>
            <TabButton tabName={'dices'}
                       activeTab={props.activeTab}
                       onPress={() => props.handelActiveTab('dices')}>
                <Text setShadow={true}>{props.dices}</Text>
            </TabButton>
            <TabButton tabName={'squares'}
                       activeTab={props.activeTab}
                       onPress={() => props.handelActiveTab('squares')}>
                <Text setShadow={true}>{props.squares}</Text>
            </TabButton>
            <TabButton tabName={'frames'}
                       activeTab={props.activeTab}
                       onPress={() => props.handelActiveTab('frames')}>
                <Text setShadow={true}>frames</Text>
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
  width: 30%;
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
const mapStateToProps = (state) => ({
    dices: selectTranslation(state,defaultTranslation.TR_DICES),
    squares: selectTranslation(state,defaultTranslation.TR_SQUARES),
})

export default connect(mapStateToProps)(TabsCollection);