// redux/store.js

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { expenseReducer, addIncomeReducer as incomeReducer, addExpense } from './reducers';


const rootReducer = combineReducers({
  expenses: expenseReducer,
  income: addIncomeReducer,
  selectedMonth: addExpense, // Use o reducer correto para selectedMonth
});

const store = createStore(rootReducer);

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
