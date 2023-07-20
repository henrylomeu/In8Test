import React, { useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/localStorage';
import styles from './Expenses.module.css'

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const savedExpenses = loadData(`expenses_${selectedYear}_${selectedMonth}`);
    if (savedExpenses) {
      setExpenses(savedExpenses);
    }
  }, [selectedMonth, selectedYear]);

  const handleAddExpense = () => {
    if (!category || !amount || !selectedMonth || !selectedYear) {
      alert('Please fill all the fields before adding a new income.');
      return;
    }

    const newExpense = {
      category,
      amount: parseFloat(amount),
      month: selectedMonth,
      year: selectedYear,
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    saveData(`expenses_${selectedYear}_${selectedMonth}`, updatedExpenses);

    setCategory('');
    setAmount('');
  };

  const availableMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const availableYears = ['2022', '2023', '2024', '2025'];

  const filteredExpenses = selectedMonth && selectedYear
    ? expenses.filter((expense) => expense.month === selectedMonth && expense.year === selectedYear)
    : expenses;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Expenses</h2>
        <div className={styles.field}>
          <label>
            Select Month:
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              <option value="">Select</option>
              {availableMonths.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </label>
          <label>
            Select Year:
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <option value="">Select</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.field}>
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
          <label>
            Value:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.addBtn}>
          <button type="button" onClick={handleAddExpense}>
            Add Income
          </button>
        </div>
      </div>
      <div className={styles.card1}>
        <h3>Expenses:</h3>
        <ul className={styles.expenseList}>
          {filteredExpenses.map((expense, index) => (
            <li key={index}>
              Category: {expense.category}, Value: R$ {expense.amount},00
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
