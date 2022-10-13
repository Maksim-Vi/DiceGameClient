import React from 'react';
import styled from "styled-components";
import Text from "../../../../common/Text/Text";
import ItemWrapper from "../../../collections/components/common/ItemWrapper";
import img from '../../../../../assets/shop/chest.png'

const DiamondsItem = (props) => {

    const clickHendler = () =>{
        alert('coming soon =)')
    }
    
    return (
        <ItemWrapper>
             <ItemContainer>
                <ItemImg source={img} resizeMode={ 'stretch'}/>
                <Text blod small color={'#fff'} center>get <Text blod medium color={'rgb(255,157,77)'}>{props.diamonds}</Text> diamonds!</Text>
            </ItemContainer>
            
            <Button onPress={clickHendler} style={{ borderBottomWidth: 3 }} activeOpacity={0.9}>
                <Text blod small color={'#fff'}>{props.price}#</Text>
            </Button>
        </ItemWrapper>
    );
};

const Button = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: rgba(20, 197, 55, 0.84);
  border-radius: 10px;
  border: 1px solid rgb(255, 157, 77);
  width: 80%;
  height: 30px;
`

const ItemContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: column;
`
const ItemImg = styled.Image`
    margin-top: 20px;
    margin-bottom: 10px;
    width: 70px;
    height: 70px;
`

export default DiamondsItem;