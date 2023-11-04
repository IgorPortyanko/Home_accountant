import { CloseCircleOutlined, DeleteOutlined   } from '@ant-design/icons'
import transactionStore from '../../store/transaction-store';


interface DescriptianProps {
    description: string;
    onClose: () => void;
    id: number
  }

const ItemDescription:React.FC<DescriptianProps> = ({ description, onClose, id }) => {

    const { deleteTransaction } = transactionStore

    const handleDeleteItem = (id: number) => {
        deleteTransaction(id)
    }

    return(
            <div className="item-description">
                <div className="item-description-text">
                    <p>{description}</p>
                </div>
                <div className="item-description-buttons-div">
                    <button className="item-description-button-close" 
                        style={{color: 'blue'}}
                        onClick={onClose}
                    >
                        Закрити <CloseCircleOutlined style={{color: 'red'}}/>
                    </button>
                    <button 
                        className="item-description-button-del" 
                        style={{color: 'black'}}
                        onClick={() => handleDeleteItem(id)}
                    >
                        Видалити <DeleteOutlined style={{color: 'red'}}/>
                    </button>
                </div>
            </div>
    )
}

export default ItemDescription