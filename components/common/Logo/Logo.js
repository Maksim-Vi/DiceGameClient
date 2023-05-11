import React from 'react';
import logo from "../../../assets/common/logo.png";
import styled from "styled-components";

const Logo = (props) => {
    return <LogoImg source={logo} resizeMode='contain'/>
}

const LogoImg = styled.Image`
  width: 270px;
  height: 70px;
`
export default Logo;