import React, {useState} from 'react'
import styled from 'styled-components'
import Text from '../../../../common/Text/Text'
import C_SCORE from '../../../../protocol/messages/clients/games/C_SCORE'
import BoardItem from '../BoardItem/BoardItem'
import {Animated, Dimensions, Easing} from "react-native";
import BoardUserInfo from './BoardUserInfo'
import TextWithoutShadow from "../../../../common/Text/TextWithoutShadow";

const ScoreBoardUser = (props) => {

    const [viewAvatarContainer, setViewAvatarContainer] = useState(false)
    const width = Dimensions.get('window').width;
   
    const selectBoardItem = (index) =>{
        if(props.diceScore && props.isYouMove){
            new C_SCORE(props.user.id, props.user.username, props.currentGameId, index, props.diceScore)
        }
    }

    const DrowBoard = () =>{

        const checkWinPiontsByColumn = (i) =>{
            const columnIndex = [[0,3,6],[1,4,7],[2,5,8]]
            let data = null
            columnIndex.flat().forEach(index=>{
                if(index === i && (index === 0 || index === 3 || index ===6)){
                    data = props.winPoints['column1']
                } else if(index === i && (index === 1 || index === 4 || index === 7)) {
                    data = props.winPoints['column2']
                } else if(index === i && (index === 2 || index === 5 || index === 8)) {
                    data = props.winPoints['column3']
                }
            })

            return data
        }

        const BoardsItem = []

        if(!props.board || props.board.length === 0) return []

        props.board.forEach((item, i)=>{
          const winPoints = checkWinPiontsByColumn(i)
          BoardsItem.push(<BoardItem key={i}
                                     item={item}
                                     winPoints={winPoints}
                                     activeItems={props.activeItems}
                                     index={i}
                                     delay={i * 100}
                                     setViewAvatarContainer={setViewAvatarContainer}
                                     selectBoardItem={selectBoardItem}/>)
        })
  
        return BoardsItem
    }

    const getColumnNumber = (column) =>{
        if(!props.winPoints) return ''
        if(props.winPoints.length === 0) return ''
        if(!props.winPoints[column] || isNaN(props.winPoints[column].sum)) return ''

        return props.winPoints[column].sum
    }

    return (
        <ScoreBoardUserContainer>
            <WinPoints width={width}>
                <Column center>{getColumnNumber('column1')}</Column>
                <Column center>{getColumnNumber('column2')}</Column>
                <Column center>{getColumnNumber('column3')}</Column>
            </WinPoints>

            <ScoresContainer width={width}>
                {DrowBoard()}
            </ScoresContainer>

            {viewAvatarContainer &&
                <BoardUserInfo user={props.user}
                               setThrowBtn={props.setThrowBtn}
                               countScores={props.countScores}/>
            }
        </ScoreBoardUserContainer>
    )
}

const ScoreBoardUserContainer = styled.View`
    position: relative;
    align-items: center;
    text-align: center;
    justify-content: center;
`
const ScoresContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
    ${props=>{
        if(props.width < 400){
            return 'width: 70%'
        } else {
          return 'width: 70%'
        }
    }}
`
const WinPoints = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  flex-direction: row;
  ${props=>{
    if(props.width < 400){
      return 'width: 70%'
    } else {
      return 'width: 70%'
    }
  }}
`
const Column = styled(TextWithoutShadow)`
  width: 33%;
  height: 20px;
`

export default ScoreBoardUser