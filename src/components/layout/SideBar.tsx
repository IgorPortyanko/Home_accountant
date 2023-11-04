import { Link } from 'react-router-dom'
import './Layout.css'
import { useState } from "react"
import FormNewItem from './FormNewItem'
import { observer } from "mobx-react-lite"
import transactionStore from "../../store/transaction-store";

const SideBar = observer(() => {

    const [ modalIsOpen, setModalIsOpen ] = useState(false)
    const { balanceOfTransactions } = transactionStore

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    return(
        
        <div className="side-bar">
            <div className="side-bar-ballance">
                <div className="side-bar-ballance-title">
                    <p>Мій баланс</p>
                </div>
                <div className="side-bar-ballance-window">
                    <p> { balanceOfTransactions() }<span style={{fontSize: 30}}>грн</span> </p>
                </div>
                
            </div>
            <button className='all-money-transactions-btn finance-btn'>
                <Link to='/'> Усі транзакції</Link>
            </button>
            <button className='income-btn finance-btn'>
                <Link to='/income'> Прибутки</Link>
            </button>
            <button className='expenses-btn finance-btn'>
                <Link to='/expense'> Витрати</Link>
            </button>
            <button 
                className="income-nav-bt finance-btn"
                onClick={openModal}
            > 
                Новий запис
            </button>
            <FormNewItem isOpen={ modalIsOpen } onRequestClose={closeModal}/>
        </div>

    )
})

export default SideBar