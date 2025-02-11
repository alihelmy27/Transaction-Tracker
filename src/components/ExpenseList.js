import React, { useContext, useState } from 'react';
import { Expense } from './Expense';
import { GlobalContext } from '../context/GlobalState';

export const ExpenseList = () => {
  const { expenses } = useContext(GlobalContext);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get unique categories from expenses
  const categories = ['All', ...new Set(expenses.map(expense => expense.category))];

  // Filter expenses based on the selected category
  const filteredExpenses = selectedCategory && selectedCategory !== 'All'
    ? expenses.filter(expense => expense.category === selectedCategory)
    : expenses;

  return (
    <>
      <h3>Transactions List</h3>

      {/* Category Filter Dropdown */}
      <div className="form-control">
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select 
          id="categoryFilter" 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Expense List */}
      <ul className="list">
        {filteredExpenses.length > 0 ? (
          filteredExpenses.map(expense => <Expense key={expense.id} expense={expense} />)
        ) : (
          <p>No expenses found for this category.</p>
        )}
      </ul>
    </>
  );
};
