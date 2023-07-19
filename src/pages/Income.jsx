import React, { useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/localStorage';

const Income = () => {
  const [income, setIncome] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    // Load saved income data for the selected month and year.
    const savedIncome = loadData(`income_${selectedYear}_${selectedMonth}`);
    if (savedIncome) {
      setIncome(savedIncome);
    }
  }, [selectedMonth, selectedYear]); // Update whenever the selected month or year changes.

  const handleAddIncome = () => {
    const newIncome = {
      category,
      amount: parseFloat(amount),
      month: selectedMonth, // Include the selected month in the income object.
      year: selectedYear, // Include the selected year in the income object.
    };

    // Update the income state for the selected month and year.
    const updatedIncome = [...income, newIncome];
    setIncome(updatedIncome);
    saveData(`income_${selectedYear}_${selectedMonth}`, updatedIncome); // Save to local storage for the selected month and year.

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

  // Filter income items based on the selected month and year.
  const filteredIncome = selectedMonth && selectedYear
    ? income.filter((item) => item.month === selectedMonth && item.year === selectedYear)
    : income;

  return (
    <div>
      <h2>Receitas</h2>
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
      </div>
      <div>
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
        <button type="button" onClick={handleAddIncome}>
          Adicionar Receita
        </button>
      </div>
      <div>
        <h3>Receitas:</h3>
        <ul>
          {filteredIncome.map((incomeItem, index) => (
            <li key={index}>
              Mês: {incomeItem.month}, Ano: {incomeItem.year}, Categoria: {incomeItem.category}, Valor: {incomeItem.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Income;
