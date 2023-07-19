import React, { useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/localStorage';

const Income = () => {
  const [income, setIncome] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const savedIncome = loadData('income');
    if (savedIncome) {
      setIncome(savedIncome);
    }
  }, []);

  const handleAddIncome = () => {
    const newIncome = {
      category,
      amount: parseFloat(amount),
    };

    const updatedIncome = [...income, newIncome];
    setIncome(updatedIncome);
    saveData('income', updatedIncome);

    setCategory('');
    setAmount('');
  };

  return (
    <div>
      <h2>Receitas</h2>
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
          {income.map((incomeItem, index) => (
            <li key={index}>
              Categoria: {incomeItem.category}, Valor: {incomeItem.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Income;
