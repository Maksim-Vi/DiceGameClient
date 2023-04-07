import React from 'react';
import styled from "styled-components";
import bg from "../../../../../../../assets/Gifts/bg/bg_title.png";
import Text from "../../../../../../common/Text/Text";

const BackgroundTitle = props => {
    return (
        <BGTabs source={bg} resizeMode={'stretch'}>
            <Text setShadow={true} fontSize={26} blod center>{props.title}</Text>
        </BGTabs>
    );
};

const BGTabs = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
`

export default BackgroundTitle;