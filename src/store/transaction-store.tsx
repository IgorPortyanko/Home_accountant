import { makeAutoObservable } from "mobx";
import { transactionItemIF } from "../models/models";
import { periodFormIF } from "../components/main/PeriodModal"; 

class TransactionStore {
    transactions: transactionItemIF[] = [];

    constructor () {
        makeAutoObservable(this);
        this.getTransactionsFromLocalStorage()
    }


    addTransaction = (transaction: transactionItemIF) => {
        //this.transactions.push(transaction)
        this.transactions = [...this.transactions, transaction];
        this.addTransactionsToLocalStorage()
        //this.sortTransactionByDate()
    }


    addTransactionsToLocalStorage = () => {
        const jsonTransactions = JSON.stringify(this.transactions)
        localStorage.setItem('myTransactions', jsonTransactions)
    }

    getTransactionsFromLocalStorage = () => {
        const transactionsFromLocalStorage = localStorage.getItem('myTransactions')
        if (transactionsFromLocalStorage){
            this.transactions = JSON.parse(transactionsFromLocalStorage);
        }
    }

    deleteTransaction = (transactionId: number) => {
        this.transactions = this.transactions.filter((el) => el.id !== transactionId )
        this.addTransactionsToLocalStorage()
    }

    balanceOfTransactions = () => { 
        return this.transactions.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.sum;
        }, 0)
    }

    filterTransactionByCashFlow = (cash: string) => {
        const filteredTransaction = [...this.transactions].filter((el) => el.cashflow === cash)
        return filteredTransaction
    }

    sortTransactionByDate = () => {
        const sortTransaction = [...this.transactions].sort((a: transactionItemIF, b: transactionItemIF) => {
            const dateA = new Date(a.date); 
            const dateB = new Date(b.date);
    
            if (dateA < dateB) {
                return -1;
              }
              if (dateA > dateB) {
                return 1;
              }
                return 0;
            }) 
        return sortTransaction
    }

    selectItemForPeriod = (data: periodFormIF) => {
        const dateA = new Date(data.firstDate); 
        const dateB = new Date(data.secondDate);
        
        const filteredItems = this.sortTransactionByDate().filter((elem) => {
          const itemDate = new Date(elem.date);
          return itemDate >= dateA && itemDate <= dateB;
        });
      
        return filteredItems;
    }
}

export default new TransactionStore()