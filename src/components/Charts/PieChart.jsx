import React from 'react';

const PieChart = ({ data }) => {
  return (
    <div>
      <h3>Receitas</h3>
      <div>
        {data.map((item) => (
          <div key={item.category}>
            <span>{item.category}</span>
            <div style={{ width: '100px', height: '100px', background: 'red' }}>
              {item.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
