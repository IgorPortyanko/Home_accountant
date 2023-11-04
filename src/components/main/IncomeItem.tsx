import { transactionItemIF } from "../../models/models";
import { useState } from 'react'
import ItemDescription from "./ItemDescription";

interface IncomeItemProps {
    income: transactionItemIF;
    textColorClass: string;
  }

const IncomeItem:React.FC<IncomeItemProps> = ({ income, textColorClass }) => {

    const [ isOpenDescription, setIsOpenDescription ] = useState(false)

    const handleOpen = () => {
        //setIsOpenDescription(true)
        setIsOpenDescription(!isOpenDescription)
    }

    const handleClose = () => {
        setIsOpenDescription(false)
    }

    return (
        <div className="item-container" >
            <div className="income-item" onClick={ handleOpen }>
                <div className="income-item-date">
                    { income.date }
                </div>
                <div className={`income-item-sum ${textColorClass}` }>
                    { income.sum } грн
                </div>
                <div className="income-item-description">
                    { income.type }
                </div>
            </div>
            
            {isOpenDescription && 
                <ItemDescription
                    description={income.description} 
                    onClose={handleClose} 
                    id={income.id}
                /> 
            }
        </div>
    )
} 

export default IncomeItem