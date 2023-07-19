import React, { useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/localStorage';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const savedExpenses = loadData('expenses');
    if (savedExpenses) {
      setExpenses(savedExpenses);
    }
  }, []);

  const handleAddExpense = () => {
    const newExpense = {
      category,
      amount: parseFloat(amount),
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    saveData('expenses', updatedExpenses);

    setCategory('');
    setAmount('');
  };

  return (
    <div>
      <h2>Despesas</h2>
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
          {expenses.map((expense, index) => (
            <li key={index}>
              Categoria: {expense.category}, Valor: {expense.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;
