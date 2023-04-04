import {createSlice} from '@reduxjs/toolkit';

let initialState = {
    timerToShow: -1
}

export const topPanelReducerSlice = createSlice({
    name: 'topPanel',
    initialState,
    reducers: {
        setTimerFlash: (state, action)=>{
            state.timerToShow = action.payload
        }
    },
});

export const {setTimerFlash} = topPanelReducerSlice.actions;

export const selectTimerFlash = state => state.topPanel.timerToShow;

export default topPanelReducerSlice.reducer;

