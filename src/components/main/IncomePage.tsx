import { observer } from "mobx-react-lite"
import IncomeItem from "./IncomeItem"
import { useEffect, useState } from "react"
import { sortDataOfDate, selectItemForPeriod } from "./dataManipulations";
import PeriodModal from "./PeriodModal";
import { periodFormIF } from "./PeriodModal"; 
import transactionStore from "../../store/transaction-store"; 
import StatisticModal from "./StatisticModal";


const IncomePage = observer(() => {

    const { transactions, getTransactionsFromLocalStorage, filterTransactionByCashFlow } = transactionStore

    useEffect(() => {
        getTransactionsFromLocalStorage()
    }, [])

    let incomeTransaction = filterTransactionByCashFlow('incomes')
    const [ isPeriodFormOpen, setPeriodFormOpen ] = useState(false)
    const [ isStatisticModalOpen, setStatisticModalOpen] = useState(false)
    const [sortedIncomes, setSortedIncomes] = useState(sortDataOfDate(incomeTransaction));

    useEffect(() => {
        incomeTransaction = filterTransactionByCashFlow('incomes')
        setSortedIncomes(sortDataOfDate(incomeTransaction))
    }, [transactions])

    const handlePeriodFormOpen = () => {
        setPeriodFormOpen(!isPeriodFormOpen)
    }

    const handlerStatisticModalOpen = () => {
        setStatisticModalOpen(!isStatisticModalOpen)
    }

    const changePeriod = (data: periodFormIF) => {
        const newSortTransaction =  selectItemForPeriod(data, sortedIncomes)
        setSortedIncomes(newSortTransaction);
    }

    return(
        <div className="income-page">
            <div className="income-navigation pages-title">
                <div className="pages-title-text">
                    <h1>Прибутки</h1>
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
                    <div onClick={() => setSortedIncomes(sortDataOfDate(incomeTransaction))}>
                            Весь період
                    </div>
                </div>
                <div className="pages-title-sort-button">
                    <div onClick={ handlerStatisticModalOpen}>
                        Дивись статистику
                    </div>
                    {isStatisticModalOpen && <StatisticModal
                        transactionArray = {sortedIncomes}
                        cashFlow="incomes"
                    />}
                </div>
            </div>
            <div className="income-list">
                <ul>
                { sortedIncomes.map((elem) => <li key={elem.id}> <IncomeItem income = { elem } textColorClass="green-text"/> </li>)}
                </ul>
            </div>
        </div>
    ) 
})

export default IncomePage