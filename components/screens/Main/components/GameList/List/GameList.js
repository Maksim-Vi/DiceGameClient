import React, {useRef, useState} from 'react';
import styled from "styled-components";
import {selectDefaultParams} from "../../../../../redux/reducers/language/LanguageReducer";
import defaultParams from "../../../../../redux/reducers/language/defaultParams";
import {connect} from "react-redux";
import {Animated, Dimensions, Platform, View} from "react-native";
import {gameListData} from "../utils";
import GameWithBot from "../GameWithBot";
import GameWithOpponent from "../GameWithOpponent";
import GameWithOpponentByTime from "../GameWithOpponentByTime";

const {width} = Dimensions.get('window');
const ITEM_SIZE_W = width ? (width / 2) - 10 : 150;
const ITEM_SIZE_H = 280;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE_W) / 2;

const GameList = props => {

    let interval = useRef().current
    const flatlistRef = useRef()
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const [currentIndex, setCurrentIndex] = useState(0)


    const updateCurrentIndex = (index) =>{
        setCurrentIndex(index);
    }

    const updateScroll = (event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index === -0 ? index : index + 1);

        clearInterval(interval);
        interval = setInterval(() => {
            clearInterval(interval);
            return  setCurrentIndex(roundIndex);
        }, 500);

    }

    const getComponentByIndex = (currentIndexList, itemId) =>{
        switch (currentIndexList){
            case 1: return <GameWithBot flatlistRef={flatlistRef.current}
                                        updateCurrentIndex={updateCurrentIndex}
                                        indexComponent={0}
                                        activeIndex={itemId}
                                        currentIndexList={currentIndex}/>
            case 2: return <GameWithOpponent flatlistRef={flatlistRef.current}
                                             updateCurrentIndex={updateCurrentIndex}
                                             indexComponent={1}
                                             activeIndex={itemId}
                                             currentIndexList={currentIndex}/>
            case 3: return <GameWithOpponentByTime flatlistRef={flatlistRef.current}
                                                   updateCurrentIndex={updateCurrentIndex}
                                                   indexComponent={2}
                                                   activeIndex={itemId}
                                                   currentIndexList={currentIndex} />
            default: return null
        }
    }

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
            outputRange: [0.7, 1, 0.7],
            extrapolate: 'clamp',
        });

        return <Game key={data.index}
                     style={{
                         width: ITEM_SIZE_W,
                         height: ITEM_SIZE_H,
                         transform: [{ scale }],
                     }}
        >
            {/*{data.item.component}*/}
            {getComponentByIndex(data.index, data.item.id)}
        </Game>
    }

    return (
        <GameListContainer>
            <GameFlatList
                ref={flatlistRef}
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
                    {
                        useNativeDriver: false,
                        listener: (event)=> updateScroll(event)
                    }
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
  height: auto;
  margin-bottom: -50px;
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
