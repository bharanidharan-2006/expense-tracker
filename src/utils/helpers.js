export const EXPENSE_CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Education', 'Other'];
export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'];
export const ALL_CATEGORIES = [...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES])];
export const CURRENCIES = ['$', '₹', '€', '£', '¥'];

const pad = (n) => String(n).padStart(2, '0');

export const monthKey = (dateStr) => dateStr.slice(0, 7);

export const currentMonthKey = () => {
  const n = new Date();
  return `${n.getFullYear()}-${pad(n.getMonth() + 1)}`;
};

export const todayISO = () => {
  const n = new Date();
  return `${currentMonthKey()}-${pad(n.getDate())}`;
};

export const formatMoney = (amount, currency) =>
  `${currency}${Number(amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const monthLabel = (key) => {
  const [y, m] = key.split('-');
  return new Date(Number(y), Number(m) - 1, 1).toLocaleString(undefined, { month: 'long', year: 'numeric' });
};

export const shortMonthLabel = (key) => {
  const [y, m] = key.split('-');
  return new Date(Number(y), Number(m) - 1, 1).toLocaleString(undefined, { month: 'short' });
};

export const formatDate = (d) => {
  const [y, m, day] = d.split('-');
  return new Date(Number(y), Number(m) - 1, Number(day)).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

// Totals for any list of transactions
export const summarize = (list) => {
  let income = 0;
  let expenses = 0;
  const byCategory = {};
  list.forEach((t) => {
    if (t.type === 'income') {
      income += t.amount;
    } else {
      expenses += t.amount;
      byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
    }
  });
  return { income, expenses, balance: income - expenses, byCategory };
};
