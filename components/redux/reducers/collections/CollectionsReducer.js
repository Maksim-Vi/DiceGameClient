import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    Shop:{},
    GameItems:{},
    MoneyItems:{
        Coins:[
            {
                id: 1,
                name: 'low bank coins',
                type: 'diamonds',
                collectionType: 'coins',
                sortIndex: 1,
                available: true,
                countAdd: 10,
                price: {
                    coins: '0',
                    diamonds: '1',
                    money: '1.99'
                },
                isSale: false,
                salePrice:{}
            },
            {
                id: 2,
                name: 'medium bank coins',
                type: 'diamonds-realmoney',
                collectionType: 'coins',
                sortIndex: 2,
                available: true,
                countAdd: 50,
                price: {
                    coins: '0',
                    diamonds: '3',
                    money: '4.50'
                },
                isSale: false,
                salePrice:{}
            },
            {
                id: 3,
                name: 'big bank coins',
                type: 'diamonds-realmoney',
                collectionType: 'coins',
                sortIndex: 3,
                available: true,
                countAdd: 100,
                price: {
                    coins: '0',
                    diamonds: '6',
                    money: '9.00'
                },
                isSale: false,
                salePrice:{}
            },
            {
                id: 4,
                name: '300 bank coins',
                type: 'realmoney',
                collectionType: 'coins',
                sortIndex: 4,
                available: true,
                countAdd: 300,
                price: {
                    coins: '0',
                    diamonds: '20',
                    money: '25.00'
                },
                isSale: false,
                salePrice:{}
            },
            {
                id: 5,
                name: '500 bank coins',
                type: 'realmoney',
                collectionType: 'coins',
                sortIndex: 5,
                available: true,
                countAdd: 500,
                price: {
                    coins: '0',
                    diamonds: '30',
                    money: '50.00'
                },
                isSale: false,
                salePrice:{}
            },
        ],
        Diamonds:[
            {
                id: 1,
                name: 'low bank diamonds',
                type: 'coins',
                collectionType: 'diamonds',
                sortIndex: 1,
                available: true,
                countAdd: 10,
                price: {
                    coins: '100',
                    diamonds: '1',
                    money: '1.99'
                },
                isSale: false,
                salePrice:{}
            },
            {
                id: 2,
                name: 'medium bank diamonds',
                type: 'coins-realmoney',
                collectionType: 'diamonds',
                sortIndex: 2,
                available: true,
                countAdd: 50,
                price: {
                    coins: '1000',
                    diamonds: '3',
                    money: '4.50'
                },
                isSale: false,
                salePrice:{}
            },
            {
                id: 3,
                name: 'big bank diamonds',
                type: 'coins-realmoney',
                collectionType: 'diamonds',
                sortIndex: 3,
                available: true,
                countAdd: 100,
                price: {
                    coins: '10000',
                    diamonds: '6',
                    money: '9.00'
                },
                isSale: false,
                salePrice:{}
            },
            {
                id: 4,
                name: '300 bank diamonds',
                type: 'realmoney',
                collectionType: 'diamonds',
                sortIndex: 4,
                available: true,
                countAdd: 300,
                price: {
                    coins: '0',
                    diamonds: '20',
                    money: '25.00'
                },
                isSale: false,
                salePrice:{}
            },
            {
                id: 5,
                name: '500 bank diamonds',
                type: 'realmoney',
                collectionType: 'diamonds',
                sortIndex: 5,
                available: true,
                countAdd: 500,
                price: {
                    coins: '0',
                    diamonds: '30',
                    money: '50.00'
                },
                isSale: false,
                salePrice:{}
            },
        ],
        Flash:[
            {
                id: 1,
                name: 'low bank flash',
                type: 'coins-diamonds-realmoney',
                collectionType: 'flash',
                sortIndex: 1,
                available: true,
                countAdd: 3,
                price: {
                    coins: '100',
                    diamonds: '1',
                    money: '2.99'
                },
                isSale: false,
                salePrice:{}
            },
            {
                id: 2,
                name: 'medium bank flash',
                type: 'diamonds-realmoney',
                collectionType: 'flash',
                sortIndex: 2,
                available: true,
                countAdd: 8,
                price: {
                    coins: '1000',
                    diamonds: '2',
                    money: '7.99'
                },
                isSale: false,
                salePrice:{}
            },
            {
                id: 3,
                name: 'big bank flash',
                type: 'diamonds-realmoney',
                collectionType: 'flash',
                sortIndex: 3,
                available: true,
                countAdd: 15,
                price: {
                    coins: '10000',
                    diamonds: '8',
                    money: '14.00'
                },
                isSale: false,
                salePrice:{}
            },
            {
                id: 4,
                name: '20 bank flash',
                type: 'realmoney',
                collectionType: 'flash',
                sortIndex: 4,
                available: true,
                countAdd: 20,
                price: {
                    coins: '0',
                    diamonds: '14',
                    money: '20.00'
                },
                isSale: false,
                salePrice:{}
            },
            {
                id: 5,
                name: '30 bank diamonds',
                type: 'realmoney',
                collectionType: 'flash',
                sortIndex: 5,
                available: true,
                countAdd: 30,
                price: {
                    coins: '0',
                    diamonds: '23',
                    money: '25.00'
                },
                isSale: false,
                salePrice:{}
            },
        ]
    }
}

export const collectionsReducerSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        addShop: (state, action)=>{
            state.Shop = action.payload
        },
        addGameItems: (state, action)=>{
            state.GameItems = action.payload
        },
        MoneyItems: (state, action)=>{
            state.MoneyItems = action.payload
        }
    },
});

export const {addShop, addGameItems,MoneyItems} = collectionsReducerSlice.actions;

export const selectGameItems = state => state.collections.GameItems;
export const selectMoneyItems = state => state.collections.MoneyItems;

export default collectionsReducerSlice.reducer;

