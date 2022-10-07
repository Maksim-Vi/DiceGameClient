import React from 'react'
import styled from 'styled-components'
import Text from '../../../common/Text/Text'
import place from '../../../../assets/result/place_2.png'
import Avatar from '../../../common/Avatars/Avatar'

const Loser = ({loser}) => {
   
    if(!loser) return null

    return (
        <LoserContainer style={{ borderBottomWidth: 5 }}>
            <PlaceContainer>
                <Place source={place} resizeMode={ 'stretch'}/>
                <Avatar width={50} height={50} avatarId={loser.player.avatar}/>
            </PlaceContainer>

            <NameTextContainer>
                <Text title heavy color={'#170231'}>{loser.player.username}</Text>
                <Text color={'#fff'}>Place №2</Text>
            </NameTextContainer>

            <WinsContainer>
                <Text medium heavy color={'#fff'}>coins: {loser.items.coins}</Text>
                <Text medium heavy color={'#fff'}>crystals: {loser.items.crystals}</Text>
                <Text medium heavy color={'#000'}> Combinations: 
                    <Text large heavy color={'#fff'}> {loser.items.scores}</Text> 
                </Text>
            </WinsContainer>

        </LoserContainer>
    )
}

const LoserContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 90%;
    height: 80px;
    border-radius: 15px;
    margin: 10px auto;
    background-color: #02b7f5;
    border: 2px solid #076e91;
`

const PlaceContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
`
const Place = styled.Image`
    width: 50px;
    height: 50px;
    margin: 0 5px;
`
const NameTextContainer = styled.View`
    display: flex;
    flex-direction: column;
`
const WinsContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-left: auto;
    margin-right: 20px;
`

export default Loser