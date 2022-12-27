import { createSlice } from '@reduxjs/toolkit';
import defaultTranslation from "./defaultTranslation";

let initialState = {
    translations: defaultTranslation
}

export const languageReducerSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setAllTranslations: (state,action) => {
            state.translations = action.payload
        },
    },
});

export const {setAllTranslations} = languageReducerSlice.actions;

export const selectTranslation = state => {

};

export default languageReducerSlice.reducer;

