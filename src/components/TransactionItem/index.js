// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {title, amount, type, id} = transactionDetails
  const onDeleteTransaction = () => {
    deleteTransaction(id, amount, type)
  }
  return (
    <li className="inner-list-item">
      <p className="inner-title">{title}</p>
      <p className="inner-amount">Rs {amount}</p>
      <p className="inner-type">{type}</p>
      <button
        type="button"
        data-testid="delete"
        className="delete-btn"
        onClick={onDeleteTransaction}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default TransactionItem
