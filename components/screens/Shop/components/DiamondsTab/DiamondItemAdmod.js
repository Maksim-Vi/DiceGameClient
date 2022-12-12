import React from 'react';
import styled from "styled-components";
import Text from "../../../../common/Text/Text";
import ItemWrapper from "../../../Collections/components/common/ItemWrapper";
import img from '../../../../../assets/shop/chest.png'

const DiamondItemAdmod = (props) => {
    return (
        <ItemWrapper>
            <ItemContainer>
                <Text heavy medium color={'#fff'}>Watching video</Text>
                <ItemImg source={img} resizeMode={ 'stretch'}/>
                <Text blod small color={'#fff'} center>get <Text blod medium color={'rgb(255,157,77)'}>1</Text> diamond!</Text>
            </ItemContainer>
            
            <AdmodButton {...props} onPress={props.admodHendler} style={{ borderBottomWidth: 3 }} activeOpacity={0.9}>
                <Text blod small color={'#fff'}>{props.loadInternal ? 'watch video' : 'waiting video'}</Text>
            </AdmodButton>
        </ItemWrapper>
    );
};

const AdmodButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${props => !props.loadInternal ? 'grey' : `green`};
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

export default DiamondItemAdmod;