import React from 'react';

const BarChart = ({ data }) => {
  return (
    <div>
      <h3>Gastos por Categoria</h3>
      <div>
        {data.map((item) => (
          <div key={item.category}>
            <span>{item.category}</span>
            <div style={{ width: `${item.amount}px`, background: 'blue', height: '20px' }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
