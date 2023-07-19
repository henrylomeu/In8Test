// reducers.js

// Importe as funções de localStorage.js
import { saveData, loadData } from '../utils/localStorage';

// Defina o estado inicial do Redux
const initialState = {
  // Defina as propriedades iniciais do estado aqui
  expenses: [],
  income: [],
};

// Defina os nomes das ações
const SAVE_EXPENSES = 'SAVE_EXPENSES';
const SAVE_INCOME = 'SAVE_INCOME';

// Defina os reducers
export const expenseReducer = (state = initialState.expenses, action) => {
  switch (action.type) {
    case SAVE_EXPENSES:
      // Salve os dados no localStorage ao atualizar o estado
      saveData('expenses', action.payload);
      return action.payload;
    default:
      // Recupere os dados do localStorage caso não haja ação correspondente
      return loadData('expenses') || state;
  }
};

export const incomeReducer = (state = initialState.income, action) => {
  switch (action.type) {
    case SAVE_INCOME:
      // Salve os dados no localStorage ao atualizar o estado
      saveData('income', action.payload);
      return action.payload;
    default:
      // Recupere os dados do localStorage caso não haja ação correspondente
      return loadData('income') || state;
  }
};
