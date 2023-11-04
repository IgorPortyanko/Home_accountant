import { useForm} from 'react-hook-form'
import { dateNow } from './createDate';

interface periodFormProps {
    closeForm: () => void;
    changePeriod: (data: periodFormIF) => void;
}

export interface periodFormIF {
    firstDate: string
    secondDate: string
}


const PeriodModal:React.FC<periodFormProps> = ({closeForm, changePeriod}) => {

    const { register, 
        handleSubmit, 
        reset,
        formState: {
            errors
        } 
    } = useForm()

    const onSubmit = (data: any) => {
        changePeriod(data)
        reset()
        closeForm()
    }

    return(
        <div className="period-modal-form-container">
            <form 
                className="period-modal-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <p>З</p>
                    <input defaultValue={'2023-01-01'} {...register('firstDate')} type="date" />
                </div>
                <div>
                    <p>По</p>
                    <input defaultValue={dateNow()} {...register('secondDate')} type="date" />
                </div>
                <div className="period-modal-form-battons-div">
                    <button type="submit">Примінити</button>
                    <button type='button' onClick={closeForm}>Закрити</button>
                </div>
            </form>
        </div>
    )
}

export default PeriodModal