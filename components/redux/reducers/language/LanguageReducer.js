import {createSlice} from '@reduxjs/toolkit';
import defaultTranslation from "./defaultTranslation";
import defaultParams from "./defaultParams";

let initialState = {
    translations: defaultTranslation,
    params: defaultParams,
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
        setAllDefaultParams: (state,action) =>{
            let paramObj = {}
            Object.entries(state.params).forEach(([key, value])=>{
                if(typeof action.payload[key] === 'boolean'){
                    paramObj[key] = action.payload[key]
                } else {
                    paramObj[key] = value
                }
            })

            state.params = paramObj
        },
        setSoundInfo: (state,action) =>{
            state.sound = action.payload
        }
    },
});

export const {setAllTranslations,setAllDefaultParams, setSoundInfo} = languageReducerSlice.actions;

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

export const selectDefaultParams = (state, param) => {
    const getDefaultParamsByParam = () =>{
        if(param && typeof state.language.params[param] === 'boolean'){
            return state.language.params[param]
        }
        return getDefaultByParam()
    }

    const getDefaultByParam = () =>{
        if(param && defaultParams[param]){
            return defaultParams[param]
        }
        return typeof param === 'boolean' ? param : false
    }

    return getDefaultParamsByParam()
};

export const selectSoundsInfo = state => state.language.sound;

export default languageReducerSlice.reducer;

