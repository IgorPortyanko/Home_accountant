import { transactionItemIF } from "../../models/models"

export const statisticCountByType = (arr:transactionItemIF[], type:string ) => {
    const filteredArray = arr.filter((el) => el.type === type)
    return filteredArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.sum;
    }, 0)
}

export const statisticCountAll = (arr:transactionItemIF[] ) => {
    return arr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.sum;
    }, 0)
}