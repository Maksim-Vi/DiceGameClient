import {createSlice} from '@reduxjs/toolkit';

let initialState = {
    roadMissions: [],
    availableToClaimMissionsRoad: 0,
    startTime: -1,
    endTime: -1,
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
        setStartTimeRoad: (state, action) => {
            state.startTime = action.payload
        },
        setEndTimeRoad: (state, action) => {
            state.endTime = action.payload
        },
    },
});

export const {setRoadMissions, calcAvailableToClaimMissionsRoad, setCurrentActiveMission, setStartTimeRoad, setEndTimeRoad} = roadReducerSlice.actions;

export const selectRoadMissions = state => state.road.roadMissions;
export const selectActiveMissionId = state => state.road.currentActiveMissionId;
export const selectStartRoadTime = state => state.road.startTime;
export const selectEndRoadTime = state => state.road.endTime;

export default roadReducerSlice.reducer;

