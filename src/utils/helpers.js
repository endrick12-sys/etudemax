export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR');
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ht-HT', {
    style: 'currency',
    currency: 'HTG',
  }).format(amount);
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const truncate = (str, length) => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};

export default {
  formatDate,
  formatCurrency,
  validateEmail,
  truncate,
};
