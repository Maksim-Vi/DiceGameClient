import React from 'react';
import styled from "styled-components";
import bg from "../../../../../../../assets/Gifts/bg/bg_btns.png";

const BackgroundTabs = props => {
    return (
        <BGTabs source={bg} resizeMode={'stretch'}>
            {props.children}
        </BGTabs>
    );
};

const BGTabs = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 370px;
  height: 100px;
  padding: 0 10px;
`

export default BackgroundTabs;