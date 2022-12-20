import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    activeChanel: 'general',
    chatTabs: []
}

export const chatReducerSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveChanel: (state, action) => {
            state.activeChanel = action.payload
        },
        addChatTab: (state, action) => {
            const isAddTab = state.chatTabs.find(tab => tab.chanelName.toLowerCase() === action.payload.chanelName.toLowerCase())

            if (!isAddTab) {
                state.chatTabs.push(action.payload)
            }
        },
        cleanChatTabs: (state, action) => {
            state.chatTabs = []
        }
    },
});

export const { addChatTab, setActiveChanel, cleanChatTabs } = chatReducerSlice.actions;

export const selectChatTabs = state => state.chat.chatTabs;
export const selectActiveChanel = state => state.chat.activeChanel;

export default chatReducerSlice.reducer;

