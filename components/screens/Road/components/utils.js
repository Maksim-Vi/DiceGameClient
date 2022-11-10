export const typesRoadBtns = {
    locked: 1,
    ready: 2,
    claimed: 3,
}

export const roadMap = [
    {
        id: 0,
        pos:{top: 77, left: 20},
        type: typesRoadBtns.claimed,
        price: 1,
        rewardType: 'coins'
    },
    {
        id: 1,
        pos:{top: 81, left: 50},
        type: typesRoadBtns.ready,
        price: 1,
        rewardType: 'coins'
    },
    {
        id: 2,
        pos:{top: 75, left: 80},
        type: typesRoadBtns.locked,
        price: 3,
        rewardType: 'coins'
    },

    {
        id: 3,
        pos:{top: 64, left: 62},
        type: typesRoadBtns.locked,
        price: 3,
        rewardType: 'coins'
    },
    {
        id: 4,
        pos:{top: 63, left: 30},
        type: typesRoadBtns.locked,
        price: 1,
        rewardType: 'diamonds'
    },
    {
        id: 5,
        pos:{top: 50, left: 25},
        type: typesRoadBtns.locked,
        price: 1,
        rewardType: 'diamonds'
    },
    {
        id: 6,
        pos:{top: 45, left: 68},
        type: typesRoadBtns.locked,
        price: 6,
        rewardType: 'coins'
    },
    {
        id: 7,
        pos:{top: 33, left: 83},
        type: typesRoadBtns.locked,
        price: 8,
        rewardType: 'coins'
    },
    {
        id: 8,
        pos:{top: 22, left: 47},
        type: typesRoadBtns.locked,
        price: 1,
        rewardType: 'diamonds'
    },
    {
        id: 9,
        pos:{top: 15, left: 13},
        type: typesRoadBtns.locked,
        price: 3,
        rewardType: 'diamonds'
    },
]