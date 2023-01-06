import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    leftTimeShowGiftAd: -1,
    numberCanMissGameAd: 5,
    countShowless: 0
}

export const advertisingReducerSlice = createSlice({
    name: 'advertising',
    initialState,
    reducers: {
        setCountShowAd: (state) => {
            state.countShowless += 1
        },
        resetCountShowAd: (state)=>{
            state.countShowless = 0
        },
        setLeftTimeShowAd: (state, action) => {
            state.leftTimeShowGiftAd = action.payload
        },
    },
});

export const { setCountShowAd, resetCountShowAd, setLeftTimeShowAd } = advertisingReducerSlice.actions;

export const selectLeftTimeShowGiftAd = state => state.advertising.leftTimeShowGiftAd

export default advertisingReducerSlice.reducer;

