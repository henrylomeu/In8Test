import React, { useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/localStorage';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    // Load saved expenses data for the selected month and year.
    const savedExpenses = loadData(`expenses_${selectedYear}_${selectedMonth}`);
    if (savedExpenses) {
      setExpenses(savedExpenses);
    }
  }, [selectedMonth, selectedYear]); // Update whenever the selected month or year changes.

  const handleAddExpense = () => {
    const newExpense = {
      category,
      amount: parseFloat(amount),
      month: selectedMonth, // Include the selected month in the expense object.
      year: selectedYear, // Include the selected year in the expense object.
    };

    // Update the expenses state for the selected month and year.
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    saveData(`expenses_${selectedYear}_${selectedMonth}`, updatedExpenses); // Save to local storage for the selected month and year.

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

  const availableYears = ['2022', '2023', '2024', '2025']; // Example list of available years.

  // Filter expenses based on the selected month and year.
  const filteredExpenses = selectedMonth && selectedYear
    ? expenses.filter((expense) => expense.month === selectedMonth && expense.year === selectedYear)
    : expenses;

  return (
    <div>
      <h2>Despesas</h2>
      <div>
        <label>
          Selecione o Mês:
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">Todos</option>
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </label>
        <label>
          Selecione o Ano:
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">Todos</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Categoria:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Valor:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button type="button" onClick={handleAddExpense}>
          Adicionar Despesa
        </button>
      </div>
      <div>
        <h3>Despesas:</h3>
        <ul>
          {filteredExpenses.map((expense, index) => (
            <li key={index}>
              Mês: {expense.month}, Ano: {expense.year}, Categoria: {expense.category}, Valor: {expense.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
