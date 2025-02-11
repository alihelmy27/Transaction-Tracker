import React from 'react';
import './App.css';
import {Header} from './components/Header';
import {Balance} from './components/Balance';
import { IncomeExpenseBox } from './components/IncomeExpenseBox';
import { ExpenseList } from './components/ExpenseList';
import { AddExpense } from './components/AddExpense';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className='container'>
        <Balance />
        <IncomeExpenseBox />
        <ExpenseList />
        <AddExpense />
        </div>
    </GlobalProvider>
  );
}

export default App;
