import React from 'react';
import styled from "styled-components";
import {selectDefaultParams} from "../../../../../redux/reducers/language/LanguageReducer";
import defaultParams from "../../../../../redux/reducers/language/defaultParams";
import {connect} from "react-redux";
import {Animated, Dimensions, Platform, View} from "react-native";
import {gameListData} from "../utils";

const {width} = Dimensions.get('window');
const ITEM_SIZE_W = width ? (width / 2) - 10 : 150;
const ITEM_SIZE_H = 230;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE_W) / 2;

const GameList = props => {

    const scrollX = React.useRef(new Animated.Value(0)).current;

    const renderItem = (data) => {
        if(data.item.id === -1 || data.item.id === -2){
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
        }


        const inputRange = [
            (data.index - 2) * ITEM_SIZE_W,
            (data.index - 1) * ITEM_SIZE_W,
            data.index * ITEM_SIZE_W,
        ];

        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.3, 0.8],
            extrapolate: 'clamp',
        });

        return <Game key={data.index}
                     style={{
                         width: ITEM_SIZE_W,
                         height: ITEM_SIZE_H,
                         transform: [{ scale }],
                     }}
        >
            {data.item.component}
        </Game>
    }

    return (
        <GameListContainer>
            <GameFlatList
                showsHorizontalScrollIndicator={false}
                data={gameListData}
                keyExtractor={(item) => item.type + item.id}
                horizontal
                bounces={false}
                decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                renderToHardwareTextureAndroid
                contentContainerStyle={{alignItems: 'center'}}
                snapToInterval={ITEM_SIZE_W}
                initialScrollIndex={0}
                snapToAlignment='start'
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false}
                )}
                scrollEventThrottle={16}
                renderItem={renderItem}/>
        </GameListContainer>
    );
};

const GameListContainer = styled.View`
  display: flex;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 55%;
`

const GameFlatList = styled(Animated.FlatList)`

`

const Game = styled(Animated.View)`
  display: flex;
  align-items: center;
  justify-content: center;
`

const mapStateToProps = (state) => ({
    params: {
        ENABLE_GAME_BOT: selectDefaultParams(state, defaultParams.ENABLE_GAME_BOT),
        ENABLE_GAME_OPPONENT: selectDefaultParams(state, defaultParams.ENABLE_GAME_OPPONENT),
        ENABLE_GAME_OPPONENT_BY_TIME: selectDefaultParams(state, defaultParams.ENABLE_GAME_OPPONENT_BY_TIME),
    }
})

export default connect(mapStateToProps)(GameList);


/*
  return (
        <GameListContainer>
            {props.params.ENABLE_GAME_BOT && <GameWithBot index={0} handlerPlayGame={handlerPlayGame}/>}
            {props.params.ENABLE_GAME_OPPONENT && <GameWithOpponent index={1} handlerPlayGame={handlerPlayGame}/>}
            {props.params.ENABLE_GAME_OPPONENT_BY_TIME && <GameWithOpponentByTime index={2} handlerPlayGame={handlerPlayGame}/>}
        </GameListContainer>
    );
*/