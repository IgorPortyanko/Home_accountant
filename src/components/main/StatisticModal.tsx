import { statisticCountByType, statisticCountAll } from "./statisticCount" 
import { expensesType, incomeType } from "../layout/submitNewIconForm" 
import { transactionItemIF } from "../../models/models"


interface statisticProps{
    transactionArray: transactionItemIF[]
    cashFlow: string
}

const StatisticModal = ({ transactionArray, cashFlow }: statisticProps) => {

    const transactionCashFlow = (cashFlow === 'incomes')? incomeType : expensesType 

    return(
        <div className="statistic-modal-container">
            <div className="statistic-modal-title">
                <p>Статистика прибутків за обраний період</p>
            </div>
            <div className="statistic-modal-list-container">
                <ul>
                    { transactionCashFlow.map((el) => 
                        <li key={el}>
                            <div className="statistic-modal-list-item">
                                <div>
                                    { el }
                                </div>
                                <div>
                                    { statisticCountByType(transactionArray, el)} <span style={{fontSize: 20}}>грн</span>
                                </div>
                            </div>
                        </li> )}
                </ul>
            </div>
            <div className="statistic-modal-list-item">
                <div>
                    <p> Разом</p>
                </div>
                <div>
                    <p> {statisticCountAll(transactionArray)} <span style={{fontSize: 20}}>грн</span></p>
                </div>
            </div>
        </div>
    )
}

export default StatisticModal