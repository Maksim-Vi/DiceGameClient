import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    sevenDaysGifts: [],
    isFinishedSevenDayGifts: true,
    availableToClaim: 0
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
        setAvailableToClaimGift: (state, action) => {
            state.availableToClaim = action.payload
        },
    },
});

export const {setGiftsData, setIsFinishedGift,setAvailableToClaimGift} = giftsReducerSlice.actions;

export const selectSevenDaysGifts = state => state.gifts.sevenDaysGifts;
export const selectIsFinishedSevenDays = state => state.gifts.isFinishedSevenDayGifts;
export const selectAvailableToClaim = state => state.gifts.availableToClaim;

export default giftsReducerSlice.reducer;

