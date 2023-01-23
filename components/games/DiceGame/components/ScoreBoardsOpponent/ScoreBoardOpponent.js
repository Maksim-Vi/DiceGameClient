import React from 'react'
import styled from 'styled-components'
import Text from '../../../../common/Text/Text'
import BoardItem from '../BoardItem/BoardItem'
import {Dimensions} from "react-native";
import TextWithoutShadow from "../../../../common/Text/TextWithoutShadow";

const OppIndexView = [6, 7, 8, 3, 4, 5, 0, 1, 2]

const ScoreBoardOpponent = (props) => {

    const width = Dimensions.get('window').width;

    const DrowBoard = () => {

        const checkWinPiontsByColumn = (i) => {
            const columnIndex = [[0, 3, 6], [1, 4, 7], [2, 5, 8]]
            let data = null
            columnIndex.flat().forEach(index => {
                if (index === i && (index === 0 || index === 3 || index === 6)) {
                    data = props.winPoints['column1']
                } else if (index === i && (index === 1 || index === 4 || index === 7)) {
                    data = props.winPoints['column2']
                } else if (index === i && (index === 2 || index === 5 || index === 8)) {
                    data = props.winPoints['column3']
                }
            })

            return data
        }

        const BoardsItem = []

        if (!props.board || props.board.length === 0) return []

        OppIndexView.forEach(index => {
            const winPoints = checkWinPiontsByColumn(index)

            BoardsItem.push(<BoardItem key={index}
                                       item={props.board[index]}
                                       activeItems={props.activeItems}
                                       delay={index * 100}
                                       winPoints={winPoints}/>)
        })

        return BoardsItem
    }

    const getColumnNumber = (column) => {
        if (!props.winPoints) return ''
        if (props.winPoints.length === 0) return ''
        if (!props.winPoints[column] || isNaN(props.winPoints[column].sum)) return ''

        return props.winPoints[column].sum
    }

    return (
        <ScoreBoardOpponentContainer>
            <ScoresContainer width={width}>
                {DrowBoard()}
            </ScoresContainer>

            <WinPoints width={width}>
                <Column center>{getColumnNumber('column1')}</Column>
                <Column center>{getColumnNumber('column2')}</Column>
                <Column center>{getColumnNumber('column3')}</Column>
            </WinPoints>

        </ScoreBoardOpponentContainer>
    )
}
const ScoreBoardOpponentContainer = styled.View`
  
`

const ScoresContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  ${props => {
    if (props.width < 400) {
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
  ${props => {
    if (props.width < 400) {
      return 'width: 70%'
    } else {
      return 'width: 70%'
    }
  }}
`
const Name = styled(Text)`
  margin-top: 10px;
`
const CountScores = styled(Text)`
  position: absolute;
  right: -22px;
  bottom: 0;
`
const Column = styled(TextWithoutShadow)`
  width: 33%;
  height: 20px;
`

export default ScoreBoardOpponent