import { saveData, loadData } from '../utils/localStorage';

const initialState = {
  expenses: [],
  income: [],
  selectedMonth: null,
};

const SAVE_EXPENSES = 'SAVE_EXPENSES';
const SAVE_INCOME = 'SAVE_INCOME';

export const expenseReducer = (state = initialState.expenses, action) => {
  switch (action.type) {
    case SAVE_EXPENSES:
      saveData('expenses', action.payload);
      return action.payload;
    default:
      return loadData('expenses') || state;
  }
};

export const incomeReducer = (state = initialState.income, action) => {
  switch (action.type) {
    case SAVE_INCOME:
      saveData('income', action.payload);
      return action.payload;
    default:
      return loadData('income') || state;
  }
};
