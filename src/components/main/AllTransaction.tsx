import transactionStore from "../../store/transaction-store"; 
import { useEffect, useState } from "react";
import IncomeItem from "./IncomeItem";
import { observer } from "mobx-react-lite";
import PeriodModal from "./PeriodModal";
import { periodFormIF } from "./PeriodModal"; 

const AllTransaction = observer(() => {

    const { transactions, getTransactionsFromLocalStorage, sortTransactionByDate, selectItemForPeriod } = transactionStore

    useEffect(() => {
        getTransactionsFromLocalStorage()
    }, [])

    const [isPeriodFormOpen, setPeriodFormOpen] = useState(false)
    const [sortedTransactions, setSortedTransactions] = useState(sortTransactionByDate());

    useEffect(() => {
        setSortedTransactions(sortTransactionByDate())
    }, [transactions])

    const handlePeriodFormOpen = () => {
        setPeriodFormOpen(!isPeriodFormOpen)
    }

    const changePeriod = (data: periodFormIF) => {
        const newSortTransaction =  selectItemForPeriod(data)
        setSortedTransactions(newSortTransaction);
    }

    const selectAllPeriod = () => {
        setSortedTransactions(sortTransactionByDate());
    }


    return(
        <div className="all-transaction-container" >
            <div className="pages-title">
                <div className="pages-title-text">
                    <h1>Усі транзакції</h1>
                </div>
                <div className="pages-title-sort-button">
                    <div onClick={ handlePeriodFormOpen }>
                        Вибрати період
                    </div>
                    { isPeriodFormOpen && <PeriodModal 
                                            closeForm = {handlePeriodFormOpen}
                                            changePeriod = {changePeriod}
                                          />
                    }
                    
                </div>
                <div className="pages-title-sort-button">
                    <div onClick={() => selectAllPeriod()}>
                            Весь період
                    </div>
                </div>
            </div>
            <div className="income-list">
                <ul>
                    { sortedTransactions.map((elem) => <li key={elem.id}> 
                                                        <IncomeItem 
                                                            income = { elem } 
                                                            textColorClass = { (elem.cashflow === 'incomes')? "green-text":'red-text'} 
                                                        /> 
                                                    </li>)}
                </ul>
            </div>
        </div>
    )
})

export default AllTransaction