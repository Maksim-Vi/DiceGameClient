import {createSlice} from '@reduxjs/toolkit';
import defaultTranslation from "./defaultTranslation";

let initialState = {
    translations: defaultTranslation
}

export const languageReducerSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setAllTranslations: (state,action) => {
            let translationObj = {}
            Object.entries(state.translations).forEach(([key, value])=>{
                if(action.payload[key]){
                    translationObj[key] = action.payload[key]
                } else {
                    translationObj[key] = value
                }
            })

            state.translations = translationObj
        },
    },
});

export const {setAllTranslations} = languageReducerSlice.actions;

export const selectTranslation = (state, param) => {
    const getTranslationByParam = () =>{
        if(param && state.language.translations[param]){
            return state.language.translations[param]
        }
        return getDefaultByParam()
    }

    const getDefaultByParam = () =>{
        if(param && defaultTranslation[param]){
            return defaultTranslation[param]
        }
        return param ? param : ''
    }

    return getTranslationByParam()
};

export default languageReducerSlice.reducer;

