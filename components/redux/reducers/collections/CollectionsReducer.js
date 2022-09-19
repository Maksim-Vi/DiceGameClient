import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    Shop:{},
    GameItems:{
        Dices:[
            {
                id: 1,
                name: 'dark',
                type: 'coins',
                sortIndex: 1,
                available: true,
                lvlUnlock: 1,
                price: {
                    coins: '200',
                    diamonds: '10',
                    money: '3.99'
                },
                saleType: '',
                isSale: false,
                salePrice:{}
            },
            {
                id: 2,
                name: 'blue',
                type: 'coins-diamonds',
                sortIndex: 2,
                available: true,
                lvlUnlock: 1,
                price: {
                    coins: '150',
                    diamonds: '5',
                    money: '1.99'
                },
                saleType: '',
                isSale: false,
                salePrice:{}
            },
            {
                id: 3,
                name: 'yellow',
                type: 'diamonds-realmoney',
                sortIndex: 3,
                available: true,
                lvlUnlock: 5,
                price: {
                    coins: '180',
                    diamonds: '7',
                    money: '2.99'
                },
                saleType: '',
                isSale: false,
                salePrice:{}
            },
            {
                id: 4,
                name: 'orange',
                type: 'diamonds',
                sortIndex: 4,
                available: true,
                lvlUnlock: 10,
                price: {
                    coins: '350',
                    diamonds: '10',
                    money: '4.99'
                },
                saleType: '',
                isSale: false,
                salePrice:{}
            },
        ],
        SquaresGame:[
           {
                id: 1,
                name: 'blackLines',
                type: 'coins-diamonds-realmoney',
                sortIndex: 1,
                available: true,
                lvlUnlock: 1,
                price: {
                    coins: '500',
                    diamonds: '15',
                    money: '4.99'
                },
               saleType: '',
               isSale: false,
               salePrice:{}
            },
            {
                id: 2,
                name: 'blackLinesAround',
                type: 'coins-diamonds-realmoney',
                sortIndex: 2,
                available: true,
                lvlUnlock: 1,
                price: {
                    coins: '500',
                    diamonds: '15',
                    money: '4.99'
                },
                saleType: '',
                isSale: false,
                salePrice:{}
            },
            {
                id: 3,
                name: 'greyLinesAround',
                type: 'coins-diamonds-realmoney',
                sortIndex: 3,
                available: true,
                lvlUnlock: 1,
                price: {
                    coins: '500',
                    diamonds: '15',
                    money: '4.99'
                },
                saleType: '',
                isSale: false,
                salePrice:{}
            },
            {
                id: 4,
                name: 'redLinesAround',
                type: 'coins-diamonds-realmoney',
                sortIndex: 4,
                available: true,
                lvlUnlock: 1,
                price: {
                    coins: '500',
                    diamonds: '15',
                    money: '4.99'
                },
                saleType: '',
                isSale: false,
                salePrice:{}
            },
            {
                id: 5,
                name: 'smile',
                type: 'coins',
                sortIndex: 5,
                available: true,
                lvlUnlock: 1,
                price: {
                    coins: '500',
                    diamonds: '15',
                    money: '4.99'
                },
            },
            {
                id: 6,
                name: 'greenBlue',
                type: 'diamonds',
                sortIndex: 6,
                available: true,
                lvlUnlock: 1,
                price: {
                    coins: '500',
                    diamonds: '15',
                    money: '4.99'
                },
            },
            {
                id: 7,
                name: 'greenBlueLinesAround',
                type: 'coins',
                sortIndex: 7,
                available: true,
                lvlUnlock: 1,
                price: {
                    coins: '500',
                    diamonds: '15',
                    money: '4.99'
                },
            },
            {
                id: 8,
                name: 'bluePurpure',
                type: 'coins',
                sortIndex: 8,
                available: true,
                lvlUnlock: 1,
                price: {
                    coins: '500',
                    diamonds: '15',
                    money: '4.99'
                },
            },
            {
                id: 9,
                name: 'default',
                type: 'coins',
                sortIndex: 9,
                available: true,
                lvlUnlock: 1,
                price: {
                    coins: '0',
                    diamonds: '0',
                    money: '0'
                },
            },
        ]
    },
    MoneyItems:{
        Coins:[
            {
                id: 1,
                name: 'low bank coins',
                type: 'diamonds',
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

    },
});

export const {} = collectionsReducerSlice.actions;

export const selectGameItems = state => state.collections.GameItems;
export const selectMoneyItems = state => state.collections.MoneyItems;

export default collectionsReducerSlice.reducer;

