import React, { useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/localStorage';
import styles from './Income.module.css'

const Income = () => {
  const [income, setIncome] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const savedIncome = loadData(`income_${selectedYear}_${selectedMonth}`);
    if (savedIncome) {
      setIncome(savedIncome);
    }
  }, [selectedMonth, selectedYear]); 

  const handleAddIncome = () => {
    if (!category || !amount || !selectedMonth || !selectedYear) {
      alert('Please fill all the fields before adding a new income.');
      return;
    }
  
    const newIncome = {
      category,
      amount: parseFloat(amount),
      month: selectedMonth,
      year: selectedYear,
    };

    const updatedIncome = [...income, newIncome];
    setIncome(updatedIncome);
    saveData(`income_${selectedYear}_${selectedMonth}`, updatedIncome); 

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

  const filteredIncome = selectedMonth && selectedYear
    ? income.filter((item) => item.month === selectedMonth && item.year === selectedYear)
    : income;

    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Income</h2>
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
            <button type="button" onClick={handleAddIncome}>
              Add Income
            </button>
          </div>
        </div>
        <div className={styles.card1}>
          <h3>Income:</h3>
          <ul className={styles.incomeList}>
            {filteredIncome.map((incomeItem, index) => (
              <li key={index}>
                Category: {incomeItem.category}, Value: R$ {incomeItem.amount},00
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
};

export default Income;
