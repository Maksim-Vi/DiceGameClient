import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    activeChanel: 'general'
}

export const chatReducerSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
       
    },
});

export const {} = chatReducerSlice.actions;

export default chatReducerSlice.reducer;

