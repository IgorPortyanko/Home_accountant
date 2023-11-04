import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import IncomeItem from "./IncomeItem"
import { sortDataOfDate, selectItemForPeriod } from "./dataManipulations";
import PeriodModal from "./PeriodModal";
import { periodFormIF } from "./PeriodModal"; 
import transactionStore from "../../store/transaction-store"; 
import StatisticModal from "./StatisticModal";

const ExpensesPage = observer(() => {


    const { transactions, getTransactionsFromLocalStorage, filterTransactionByCashFlow } = transactionStore

    useEffect(() => {
        getTransactionsFromLocalStorage()
    }, [])

    let expenseTransaction = filterTransactionByCashFlow('expenses')
    const [ isPeriodFormOpen, setPeriodFormOpen ] = useState(false)
    const [sortedExpenses, setSortedExpenses] = useState(sortDataOfDate(expenseTransaction));
    const [ isStatisticModalOpen, setStatisticModalOpen] = useState(false)

    const handlePeriodFormOpen = () => {
        setPeriodFormOpen(!isPeriodFormOpen)
    }

    useEffect(() => {
        expenseTransaction = filterTransactionByCashFlow('expenses')
        setSortedExpenses(sortDataOfDate(expenseTransaction))
    }, [transactions])

    const changePeriod = (data: periodFormIF) => {
        const newSortTransaction =  selectItemForPeriod(data, sortedExpenses)
        setSortedExpenses(newSortTransaction);
    }

    const handlerStatisticModalOpen = () => {
        setStatisticModalOpen(!isStatisticModalOpen)
    }

    return(
        <div>
            <div className="income-navigation pages-title">
                <div className="pages-title-text">
                    <h1>Витрати</h1>
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
                    <div onClick={() => setSortedExpenses(sortDataOfDate(expenseTransaction))}>
                            Весь період
                    </div>
                </div>
                <div className="pages-title-sort-button">
                    <div onClick={ handlerStatisticModalOpen}>
                        Дивись статистику
                    </div>
                    {isStatisticModalOpen && <StatisticModal
                        transactionArray = {sortedExpenses}
                        cashFlow="expenses"
                    />}
                </div>
            </div>
            <div className="income-list">
                <ul>
                { sortedExpenses.map((elem) => <li key={elem.id}> <IncomeItem income = { elem } textColorClass="red-text"/> </li>)}
                </ul>
            </div>
        </div>
    )
})

export default ExpensesPage