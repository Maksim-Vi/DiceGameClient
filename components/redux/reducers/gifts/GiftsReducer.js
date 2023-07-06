import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    everyDaysGifts: [],
    everyDaysGiftsResult: null,

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
        setEveryDayGiftResult: (state, action) => {
            state.everyDaysGiftsResult = action.payload
        },
        setIsFinishedGift: (state, action) => {
            state[action.payload.isFinishGiftType] = action.payload.finishData
        },
        setAvailableToClaimGift: (state, action) => {
            state.availableToClaim = action.payload
        },
    },
});

export const {setGiftsData, setEveryDayGiftResult, setIsFinishedGift,setAvailableToClaimGift} = giftsReducerSlice.actions;

export const selectEveryDaysGifts = state => state.gifts.everyDaysGifts;
export const selectSevenDaysGifts = state => state.gifts.sevenDaysGifts;
export const selectSevenDaysGiftsResult = state => state.gifts.everyDaysGiftsResult;
export const selectIsFinishedSevenDays = state => state.gifts.isFinishedSevenDayGifts;
export const selectAvailableToClaim = state => state.gifts.availableToClaim;

export default giftsReducerSlice.reducer;

