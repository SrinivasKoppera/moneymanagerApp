// Write your code here
import {Component} from 'react'
import './index.css'

class MoneyDetails extends Component {
  onChangeTitle = event => {
    const {changeTitle} = this.props
    const updateTitle = event.target.value
    changeTitle(updateTitle)
  }

  onAmountChange = event => {
    const {changeAmount} = this.props
    const updateAmount = parseInt(event.target.value)

    changeAmount(updateAmount)
  }

  onOptionChange = event => {
    const {changeAmountType} = this.props
    const updateAmountType = event.target.value
    changeAmountType(updateAmountType)
  }

  onSubmitForm = event => {
    const {addTransaction} = this.props
    addTransaction(event)
  }

  render() {
    const {transactionTypeOptions, title, optionId, amount} = this.props
    return (
      <div className="transaction-container">
        <h2 className="transaction-heading">Add Transaction</h2>
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <label className="label" htmlFor="title">
            TITLE
          </label>
          <input
            value={title}
            type="text"
            placeholder="TITLE"
            className="input-field"
            id="title"
            onChange={this.onChangeTitle}
          />
          <label htmlFor="amount" className="label">
            AMOUNT
          </label>
          <input
            value={amount}
            className="input-field"
            type="text"
            id="amount"
            placeholder="AMOUNT"
            onChange={this.onAmountChange}
          />
          <label htmlFor="type" className="label">
            TYPE
          </label>
          <select
            value={optionId}
            name="amount"
            className="input-field"
            onChange={this.onOptionChange}
          >
            {transactionTypeOptions.map(eachType => (
              <option key={eachType.optionId} value={eachType.optionId}>
                {eachType.displayText}
              </option>
            ))}
          </select>
          <button type="submit" className="submit-btn">
            Add
          </button>
        </form>
      </div>
    )
  }
}

export default MoneyDetails
