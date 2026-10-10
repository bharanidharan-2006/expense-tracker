import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { summarize, currentMonthKey, monthKey } from '../utils/helpers.js';

const TX_KEY = 'expense-tracker:transactions';
const CURRENCY_KEY = 'expense-tracker:currency';

const ExpenseContext = createContext(null);

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function ExpenseProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = load(TX_KEY, []);
    return Array.isArray(saved) ? saved : [];
  });
  const [currency, setCurrency] = useState(() => load(CURRENCY_KEY, '₹'));

  useEffect(() => {
    try {
      localStorage.setItem(TX_KEY, JSON.stringify(transactions));
    } catch {
      /* ignore storage errors */
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(CURRENCY_KEY, JSON.stringify(currency));
    } catch {
      /* ignore storage errors */
    }
  }, [currency]);

  const addTransaction = useCallback((data) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
    setTransactions((prev) => [{ ...data, id }, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearTransactions = useCallback(() => setTransactions([]), []);

  const totals = useMemo(() => {
    const all = summarize(transactions);
    const thisMonth = summarize(transactions.filter((t) => monthKey(t.date) === currentMonthKey()));
    return { ...all, monthExpenses: thisMonth.expenses };
  }, [transactions]);

  const value = {
    transactions,
    currency,
    setCurrency,
    addTransaction,
    deleteTransaction,
    clearTransactions,
    totals,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export function useExpenses() {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error('useExpenses must be used inside ExpenseProvider');
  return ctx;
}
