import {createSlice} from '@reduxjs/toolkit';
import defaultTranslation from "./defaultTranslation";

let initialState = {
    translations: defaultTranslation,
    sound: true,
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
        setSoundInfo: (state,action) =>{
            state.sound = action.payload
        }
    },
});

export const {setAllTranslations, setSoundInfo} = languageReducerSlice.actions;

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

export const selectSoundsInfo = state => state.language.sound;

export default languageReducerSlice.reducer;

