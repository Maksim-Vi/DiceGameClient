import React, {Component, PureComponent} from 'react';
import {Dimensions} from "react-native";
import C_SCORE from "../../../../protocol/messages/clients/games/C_SCORE";
import TextWithoutShadow from "../../../../common/Text/TextWithoutShadow";
import BoardItem from "../BoardItem/BoardItem";
import Dispatcher from "../../../Events/Dispatcher";
import styled from 'styled-components'
import GameModel from "../../../GameModel/GameModel";
import {connect} from "react-redux";
import {selectActiveItems} from "../../../../redux/reducers/players/PlayersReducer";
import CollectTextAnimation from "../../../Animation/CollectTextAnimation";

class UserBoard extends PureComponent {
    constructor() {
        super();

        this.state = {
            board: [],
            winPoints: [],
            activeItems: {square: 1000, dice: 1}
        }

        this.width = Dimensions.get('window').width;

        this.addListener()
    }

    componentDidMount() {
        if(this.props.activeItems){
            this.setState({activeItems: this.props.activeItems})
        }
    }

    addListener = () =>{
        Dispatcher.add('state:userBoard', this.onUpdateUserBoardData, this);
    }

    componentWillUnmount() {
        Dispatcher.remove('state:userBoard', this.onUpdateUserBoardData)
    }

    onUpdateUserBoardData() {
        const board = GameModel.userBoard
        if(board){
            this.setState({
                board: board,
                winPoints: GameModel.calcPoints(board)
            })
        }
    }

     selectBoardItem = (index) =>{
        if(GameModel.throwData && GameModel.isYouMove){
            new C_SCORE(GameModel.user.id, GameModel.user.username, GameModel.gameId, index, GameModel.throwData)
        }
    }

     DrawBoard = () =>{

         const checkWinPiontsByColumn = (i) =>{
             const columnIndex = [[0,3,6],[1,4,7],[2,5,8]]
             let data = null
             columnIndex.flat().forEach(index=>{
                 if(index === i && (index === 0 || index === 3 || index ===6)){
                     data = this.state.winPoints['column1']
                 } else if(index === i && (index === 1 || index === 4 || index === 7)) {
                     data = this.state.winPoints['column2']
                 } else if(index === i && (index === 2 || index === 5 || index === 8)) {
                     data = this.state.winPoints['column3']
                 }
             })

             return data
         }

         const BoardsItem = []

         if(!this.state.board || this.state.board.length === 0) return []

         this.state.board.forEach((item, i)=>{
             const winPoints = checkWinPiontsByColumn(i)
             BoardsItem.push(<BoardItem key={i}
                                        item={item}
                                        winPoints={winPoints}
                                        isUserBoard={true}
                                        activeItems={this.state.activeItems}
                                        index={i}
                                        delay={i * 100}
                                        selectBoardItem={this.selectBoardItem}/>)
         })

        return BoardsItem
    }

    getColumnNumber = (column) =>{
        if(!this.state.winPoints) return ''
        if(this.state.winPoints.length === 0) return ''
        if(!this.state.winPoints[column] || isNaN(this.state.winPoints[column].sum)) return ''

        return this.state.winPoints[column].sum
    }



    render() {
        return (
            <ScoreBoardUserContainer>
                <WinPoints width={this.width}>
                    <Column center madium blod color={'#000'}>{this.getColumnNumber('column1')}</Column>
                    <Column center madium blod color={'#000'}>{this.getColumnNumber('column2')}</Column>
                    <Column center madium blod color={'#000'}>{this.getColumnNumber('column3')}</Column>
                </WinPoints>

                <ScoresContainer width={this.width}>
                    {this.DrawBoard()}
                </ScoresContainer>
            </ScoreBoardUserContainer>
        )
    }
}

const ScoreBoardUserContainer = styled.View`
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
`

const ScoresContainer = styled.View`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  height: 90%;
`
const WinPoints = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  flex-direction: row;
  width: 100%;
`

const Column = styled(TextWithoutShadow)`
  width: 33%;
  height: 20px;
`

const mapStateToProps = (state) => ({
    activeItems: selectActiveItems(state),
})

export default connect(mapStateToProps)(UserBoard);