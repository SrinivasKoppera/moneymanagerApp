import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionsList: [],
    title: '',
    amount: '',
    optionId: transactionTypeOptions[0].optionId,
    income: 0,
    expenses: 0,
  }

  changeTitle = updateTitle => {
    this.setState({title: updateTitle})
  }

  changeAmount = updateAmount => {
    this.setState({amount: updateAmount})
  }

  changeAmountType = updateAmountType => {
    this.setState({optionId: updateAmountType})
  }

  addTransaction = event => {
    const {title, amount, optionId} = this.state
    event.preventDefault()
    const typeOption = transactionTypeOptions.find(
      each => each.optionId === optionId,
    )
    const {displayText} = typeOption
    console.log(displayText)
    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type: displayText,
    }
    this.setState(prevState => {
      if (optionId === 'INCOME') {
        return {
          income: prevState.income + amount,
          transactionsList: [...prevState.transactionsList, newTransaction],
          title: '',
          amount: '',
          optionId: transactionTypeOptions[0].optionId,
        }
      }
      return {
        expenses: prevState.expenses + amount,
        transactionsList: [...prevState.transactionsList, newTransaction],
        title: '',
        amount: '',
        optionId: transactionTypeOptions[0].optionId,
      }
    })
  }

  deleteTransaction = (id, amount, type) => {
    this.setState(prevState => {
      if (type === 'Income') {
        return {
          transactionsList: prevState.transactionsList.filter(
            eachItem => eachItem.id !== id,
          ),
          income: prevState.income - amount,
          expenses: prevState.expenses,
        }
      }
      return {
        transactionsList: prevState.transactionsList.filter(
          eachItem => eachItem.id !== id,
        ),
        expenses: prevState.expenses - amount,
        income: prevState.income,
      }
    })
  }

  render() {
    const {
      transactionsList,
      title,
      optionId,
      type,
      amount,
      income,
      expenses,
    } = this.state

    return (
      <div className="bg-container">
        <div>
          <div className="welcome-container">
            <h1 className="name">Hi, Richard</h1>
            <p className="welcome-text">
              Welcome back to your{' '}
              <span className="money-manager">Money Manager</span>
            </p>
          </div>
          <div className="income-expensive-container">
            <div className="money-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
                alt="balance"
                className="balance-img"
              />
              <div className="balance-container">
                <p className="balance-description">Your Balance</p>
                <p className="amount" data-testid="balanceAmount">
                  Rs {income - expenses}
                </p>
              </div>
            </div>
            <div className="money-container money-container-2">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
                alt="income"
                className="balance-img"
              />
              <div className="balance-container">
                <p className="balance-description">Your Income</p>
                <p className="amount" data-testid="incomeAmount">
                  Rs {income}
                </p>
              </div>
            </div>
            <div className="money-container money-container-3">
              <img
                src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
                alt="expenses"
                className="balance-img"
              />
              <div className="balance-container">
                <p className="balance-description">Your Expenses</p>
                <p className="amount" data-testid="expensesAmount">
                  Rs {expenses}
                </p>
              </div>
            </div>
          </div>
          <div className="components-container">
            <MoneyDetails
              transactionTypeOptions={transactionTypeOptions}
              changeTitle={this.changeTitle}
              changeAmount={this.changeAmount}
              changeAmountType={this.changeAmountType}
              addTransaction={this.addTransaction}
              title={title}
              amount={amount}
              type={type}
              optionId={optionId}
            />
            <div className="history-container">
              <h2 className="history-heading">History</h2>
              <ul className="history-items-container">
                <li className="list-item">
                  <p className="title">Title</p>
                  <p className="amount">Amount</p>
                  <p className="type">Type</p>
                </li>
                {transactionsList.map(eachHistory => (
                  <TransactionItem
                    key={eachHistory.id}
                    transactionDetails={eachHistory}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
