// localStorage.js

// Função para salvar os dados no localStorage
export const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar os dados no localStorage:', error);
  }
};

// Função para recuperar os dados do localStorage
export const loadData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao recuperar os dados do localStorage:', error);
    return null;
  }
};
