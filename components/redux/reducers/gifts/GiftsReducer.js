import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    sevenDaysGifts: [],
    isFinishedSevenDayGifts: true
}

export const giftsReducerSlice = createSlice({
    name: 'gifts',
    initialState,
    reducers: {
        setGiftsData: (state, action) => {
            state[action.payload.giftType] = action.payload.giftData
        },
        setIsFinishedGift: (state, action) => {
            state[action.payload.isFinishGiftType] = action.payload.finishData
        },
    },
});

export const {setGiftsData, setIsFinishedGift} = giftsReducerSlice.actions;

export const selectSevenDaysGifts = state => state.gifts.sevenDaysGifts;

export default giftsReducerSlice.reducer;

