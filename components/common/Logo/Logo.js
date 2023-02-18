import React from 'react';
import logo from "../../../assets/common/logo.png";
import styled from "styled-components";

const Logo = (props) => {
    return <LogoImg source={logo} resizeMode='contain'/>
}

const LogoImg = styled.Image`
  width: 200px;
  height: 50px;
`
export default Logo;