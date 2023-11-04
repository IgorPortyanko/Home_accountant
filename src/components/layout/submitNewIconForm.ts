import transactionStore from "../../store/transaction-store";

export const transactionSubmit = (data: any) => {
    transactionStore.addTransaction(data);
}

export const expensesType = [
                                'Продукти', 
                                'Одяг', 
                                'Комунальні платежі', 
                                'Проїзд', 
                                'Кава', 
                                'Сигарети',
                                'Пиво', 
                                'Розваги', 
                                'Інше'
                            ]

export const incomeType =   [
                                'Заробітна плата', 
                                'Підробіток', 
                                'Подарунок', 
                                'Інше',
                            ]


