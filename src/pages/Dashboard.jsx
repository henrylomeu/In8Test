import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveData, loadData } from '../utils/localStorage';
import { PieChart, Pie, Tooltip, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const savedExpenses = loadData('expenses');
    const savedIncome = loadData('income');

    if (savedExpenses) {
      setExpenses(savedExpenses);
    }
    if (savedIncome) {
      setIncome(savedIncome);
    }

    setUsername(location?.state?.username || '');
  }, [location]);

  const handleLogout = () => {
    saveData('expenses', []);
    saveData('income', []);
    navigate('/');
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const totalIncome = income.reduce((total, incomeItem) => total + incomeItem.amount, 0);
  const netTotal = totalIncome - totalExpenses;

  const chartData = [
    { name: 'Despesas', value: totalExpenses },
    { name: 'Receitas', value: totalIncome },
  ];
  const barChartData = [
    { name: 'Despesas', value: totalExpenses },
    { name: 'Receitas', value: totalIncome },
  ];
  const COLORS = ['#FF1A1A', '#10A37F'];

  const RADIAN = Math.PI / 180;
  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <button
          className={styles.sidebarButton}
          onClick={() => navigate('/expenses')}
        >
          <i className="fas fa-money-bill-wave"></i>
        </button>
        <button
          className={styles.sidebarButton}
          onClick={() => navigate('/income')}
        >
          <i className="fas fa-money-bill"></i>
        </button>
      </div>
      <div>
        <h2 className={styles.dashboardTitle}>Dashboard</h2>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
        <div>
          <p>Usuário: {username}</p>
        </div>
        <div className={styles.dashboardButtons}>
        <div className={styles.buttonContainer}>
          <button onClick={() => navigate('/expenses')}>
            <i className="fas fa-money-bill-wave"></i>
            Despesas: R$ {totalExpenses},00
          </button>
          <button onClick={() => navigate('/income')}>
            <i className="fas fa-money-bill"></i>
            Receitas: R$ {totalIncome},00
          </button>
          <button>
            <i className="fas fa-balance-scale"></i>
            Total Líquido: R$ {netTotal},00
          </button>
        </div>
      </div>
        <div className={styles.chartContainer}>
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={<CustomLabel />}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <ResponsiveContainer width={300} height={300}>
            <BarChart
              width={500}
              height={300}
              data={barChartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill={(entry, index) => COLORS[index % COLORS.length]}
                label={<CustomLabel />}
              >
                {barChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
