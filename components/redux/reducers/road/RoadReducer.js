import {createSlice} from '@reduxjs/toolkit';

let initialState = {
    roadMissions: [],
    availableToClaimMissionsRoad: 0,
    currentActiveMissionId: null
}

export const roadReducerSlice = createSlice({
    name: 'road',
    initialState,
    reducers: {
        setRoadMissions: (state, action) => {
            state.roadMissions = action.payload
        },
        calcAvailableToClaimMissionsRoad: (state, action) => {
            state.availableToClaimMissionsRoad = action.payload
        },
        setCurrentActiveMission: (state, action) => {
            state.currentActiveMissionId = action.payload
        },
    },
});

export const {setRoadMissions, calcAvailableToClaimMissionsRoad, setCurrentActiveMission} = roadReducerSlice.actions;

export const selectRoadMissions = state => state.road.roadMissions;
export const selectActiveMissionId = state => state.road.currentActiveMissionId;

export default roadReducerSlice.reducer;

