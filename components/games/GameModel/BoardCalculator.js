export default class BoardCalculator {
    constructor() {
        this.columnIndex = [[0,3,6],[1,4,7],[2,5,8]]
    }

    userBoardCalculate(data){
        if(!data || data.length === 0) return []

        //return data.flat()
        return data
    }

    opponentBoardCalculate(data){
        if(!data || data.length === 0) return []

        //return data.flat()
        return data
    }

    scoresToSame = (index,scores) =>{

        const calcSameItems = (index,column) =>{
            const countItems = column.reduce((acc, item, index, array) => {
                acc.obj[item] = acc.obj[item] ? acc.obj[item] + 1 : 1
                return acc;
            }, {obj:{}});

            let sum = 0
            const data = {}
            column.forEach((item) => {
                if(countItems.obj[item] > 1){
                    data['number'] = item
                    data['count'] = countItems.obj[item] || null
                }
                sum = (item * countItems.obj[item]) + sum
                data['sum'] = sum || null
            });

            return countItems ? data : null
        }

        let column = []

        if(scores){
            this.columnIndex[index].forEach(columnIndex => {
                if(scores[columnIndex] === 0) return
                column.push(scores[columnIndex])
            })

            return calcSameItems(index,column)
        }
    }

    userPointsCalculate = (scores) =>{
        const column1 = this.scoresToSame(0,scores)
        const column2 = this.scoresToSame(1,scores)
        const column3 = this.scoresToSame(2,scores)

        return {
            column1: column1,
            column2: column2,
            column3: column3
        }
    }

    opponentPointsCalculate = (scores) =>{
        const column1 = this.scoresToSame(0,scores)
        const column2 = this.scoresToSame(1,scores)
        const column3 = this.scoresToSame(2,scores)

        return {
            column1: column1,
            column2: column2,
            column3: column3
        }
    }
}