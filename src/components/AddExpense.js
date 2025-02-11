import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { expenseSchema } from "../schemas"; // Import Yup schema

export const AddExpense = () => {
  const { addExpense, expenses } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    text: "",
    amount: "",
    category: "",
  });

  const [errors, setErrors] = useState({});

  const categories = ["Food & Drinks", "Transportation", "Life Expenses", "Other"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form data using Yup
      await expenseSchema.validate(formData, { abortEarly: false });

      // If valid, create and add expense
      const newExpense = {
        id: expenses[0] ? expenses[0].id + 1 : 1,
        text: formData.text,
        amount: Number(formData.amount),
        category: formData.category,
      };

      addExpense(newExpense);

      // Reset form after successful submission
      setFormData({ text: "", amount: "", category: "" });
      setErrors({});
    } catch (err) {
      // Format Yup errors into an object
      const formattedErrors = {};
      err.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });

      setErrors(formattedErrors);
    }
  };

  return (
    <>
      <h3>Add New Transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Name</label>
          <input
            id="text"
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Enter Name..."
          />
          {errors.text && <p className="error">{errors.text}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="amount">Amount (+ Income | - Expense)</label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter Amount..."
          />
          {errors.amount && <p className="error">{errors.amount}</p>}
        </div>

        <div className="form-control">
          <label htmlFor="category">Category</label><br />
          <select name="category" id="category" value={formData.category} onChange={handleChange}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        <button className="btn">Add Transaction</button>
      </form>
    </>
  );
};
