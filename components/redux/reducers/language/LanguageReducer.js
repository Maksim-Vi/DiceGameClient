import {createSlice} from '@reduxjs/toolkit';
import defaultTranslation from "./defaultTranslation";
import defaultParams from "./defaultParams";
import userParams from "./userParams";

let initialState = {
    translations: defaultTranslation,
    params: defaultParams,
    userParams: userParams,
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
                } else if(!!action.payload[key]){
                    paramObj[key] = action.payload[key]
                } else {
                    paramObj[key] = value
                }
            })

            state.params = paramObj
        },
        setAllUserParams: (state,action) =>{
            let paramObj = {}
            Object.entries(state.userParams).forEach(([key, value])=>{
                if(typeof action.payload[key] === 'boolean'){
                    paramObj[key] = action.payload[key]
                } else {
                    paramObj[key] = value
                }
            })

            state.userParams = paramObj
        },
        setSoundInfo: (state,action) =>{
            state.sound = action.payload
        }
    },
});

export const {setAllTranslations,setAllDefaultParams,setAllUserParams, setSoundInfo} = languageReducerSlice.actions;

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
        } else if(param && !!state.language.params[param]){
            return state.language.params[param]
        }
        return getDefaultByParam()
    }

    const getDefaultByParam = () =>{
        if(param && defaultParams[param]){
            return defaultParams[param]
        }
        //return typeof param === 'boolean' ? param : false
        return param
    }

    return getDefaultParamsByParam()
};

export const selectUserParams = (state, param) => {
    const getUserParamsByParam = () =>{
        if(param && typeof state.language.userParams[param] === 'boolean'){
            return state.language.userParams[param]
        }
        return getUserByParam()
    }

    const getUserByParam = () =>{
        if(param && userParams[param]){
            return userParams[param]
        }
        return typeof param === 'boolean' ? param : false
    }

    return getUserParamsByParam()
};

export const selectSoundsInfo = state => state.language.sound;

export default languageReducerSlice.reducer;

