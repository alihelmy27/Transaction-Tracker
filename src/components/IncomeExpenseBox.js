import React,{useContext} from 'react';
import { GlobalContext } from '../context/GlobalState'

export const IncomeExpenseBox = () => {
  const {expenses} =useContext(GlobalContext);
  const amounts = expenses.map(expense => expense.amount);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
      amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
      -1
    ).toFixed(2);

  return (
    <div className="inc-exp-container">
         <div>
          <h4>Income</h4>
          <p className="money plus">+${income}</p>
        </div> 
        <div>
          <h4>Expenditure</h4>
          <p className="money minus">-${expense}</p>
        </div>
      </div>
  )
}
