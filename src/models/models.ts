
export interface incomeItemIF {
    transaction: string
    id: number
    date: string
    description: string
    sum: number
    type: string
}

export interface expenceItemIF {
    transaction: string
    id: number
    date: string
    description: string
    sum: number
    type: string
}

export interface transactionItemIF {
    cashflow: string
    id: number
    date: string
    description: string
    sum: number
    type: string
}