import Modal from "react-modal"
import { CloseCircleOutlined, CheckCircleOutlined  } from '@ant-design/icons'
import { useForm} from 'react-hook-form'
import { transactionSubmit, expensesType, incomeType } from './submitNewIconForm'
import { useState, ChangeEvent } from "react"
 
interface NewIncomeFormProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const FormNewItem:React.FC<NewIncomeFormProps> = ({ isOpen, onRequestClose }) => {

    const [ isIncome, setIsIncome] = useState(true)
    const [ selectedTransaction, setSelectedTransaction] = useState(false)

    const changeTransaction = (event: ChangeEvent<HTMLSelectElement>) => {
        (event.target.value === 'incomes')? setIsIncome(true) : setIsIncome(false)
        setSelectedTransaction(true)
    }

    const { register, 
            handleSubmit, 
            reset,
            formState: {
                errors
            } 
        } = useForm()

    const onSubmit = (data: any) => {
        data.id = Date.now()
        data.cashflow === 'incomes'? data.sum = parseFloat(data.sum) : data.sum = -parseFloat(data.sum)
        transactionSubmit(data)
        setSelectedTransaction(false)
        onRequestClose()
        reset()
    }

    const handleCloseModal = () => {
        onRequestClose()
        setSelectedTransaction(false)
        reset()
    }

    return(
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            className='income-form-modal'
        >
                <form 
                    className="form-new-transaction"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="form-transaction-type input-in-form">
                        <label>
                            <p className="form-lable-p">Введіть тип запису</p>
                            <select 
                                {...register('cashflow')} 
                                onChange={changeTransaction}
                                defaultValue={''}
                            >
                                <option value="" disabled>Виберіть тип</option>
                                <option value="incomes">Прибутки</option>
                                <option value="expenses">Витрати</option>
                            </select>
                        </label>
                    </div>
                    <div className="income-form-date input-in-form">
                        <label>
                            <p className="form-lable-p">Введіть дату</p>
                            <input 
                                type="date" 
                                {...register('date', {required: "Поле обов'язкове"})}
                                disabled = {!selectedTransaction}
                            />
                        </label>
                        <div style={{color: 'red'}}>
                            {errors?.date && (<p>{String(errors.date?.message) || 'Error'}</p>)}
                        </div>
                    </div>
                    <div className="income-form-sum input-in-form">
                        <label>
                            <p className="form-lable-p">Введіть суму</p>
                            <input 
                                type="number" 
                                step="0.01" 
                                {...register('sum', {required: "Поле обов'язкове"})}
                                disabled = {!selectedTransaction}
                            />
                        </label>
                        <div style={{color: 'red'}}>
                            {errors?.sum && (<p>{String(errors.sum?.message) || 'Error'}</p>)}
                        </div>
                    </div>
                    <div className="income-form-description">
                        <label>
                            <p className="form-lable-p">Введіть опис</p>
                            <textarea 
                                {...register('description', {required: "Поле обов'язкове"})} 
                                cols={55} 
                                rows={5}
                                disabled = {!selectedTransaction}
                            >      
                            </textarea>
                        </label>
                        <div style={{color: 'red'}}>
                            {errors?.description && (<p>{String(errors.description?.message) || 'Error'}</p>)}
                        </div>
                    </div>
                    <div className="income-form-type input-in-form">
                        <label>
                            <p className="form-lable-p">Введіть тип</p>
                            <select 
                                {...register('type', {required: "Поле обов'язкове"})}
                                disabled = {!selectedTransaction}
                                defaultValue={''}
                            >
                                <option value="" disabled>Виберіть тип</option>
                                { (isIncome? incomeType : expensesType).map((type) => 
                                    <option key={type} value={type}>{type}</option>
                                )} 
                            </select>
                        </label>
                        <div style={{color: 'red'}}>
                            {errors?.type && (<p>{String(errors.type?.message) || 'Error'}</p>)}
                        </div>
                    </div>
                    <div className="submit-modal-button-div">
                        <button type="submit" disabled = {!selectedTransaction}>
                            Додати <CheckCircleOutlined style={{color: 'green'}}/>
                        </button>
                        <button 
                        onClick={handleCloseModal}
                        > 
                            Закрити <CloseCircleOutlined style={{color: 'red'}}/>
                        </button>
                    </div>
                </form>
        </Modal>
    )
}

export default FormNewItem