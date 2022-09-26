import React from 'react';
import styled from "styled-components";

const ItemWrapper = ({children}) => {
    return (
        <ItemContainer>
            {children}
        </ItemContainer>
    );
};

const ItemContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 30%;
  height: 180px;
  border-radius: 20px;
  margin: 10px auto;
  background-color: rgba(220, 220, 220, 0.73);
  border: 2px solid rgba(229, 229, 229, 0.9);
`
export default ItemWrapper;