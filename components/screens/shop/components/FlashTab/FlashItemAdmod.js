import React from 'react';
import styled from "styled-components";
import Text from "../../../../common/Text/Text";
import ItemWrapper from "../../../collections/components/common/ItemWrapper";
import img from '../../../../../assets/shop/lightning.png'

const FlashItemAdmod = (props) => {
    return (
        <ItemWrapper>
           <ItemContainer>
                <Text heavy medium color={'#fff'}>Watching video</Text>
                <ItemImg source={img} resizeMode={ 'stretch'}/>
                <Text blod small color={'#fff'} center>get <Text blod medium color={'rgb(255,157,77)'}>3</Text> flash!</Text>
            </ItemContainer>
            
            <AdmodButton onPress={props.admodHendler}>
                <Text blod small color={'#fff'}>{props.btnText}</Text>
            </AdmodButton>
        </ItemWrapper>
    );
};

const AdmodButton = styled.TouchableOpacity`
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
  justify-content: space-around;
`
const ItemImg = styled.Image`
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
`


export default FlashItemAdmod;