import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext.jsx';
import SearchFilter from '../components/SearchFilter.jsx';
import TransactionList from '../components/TransactionList.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import { monthKey } from '../utils/helpers.js';

const DEFAULT_FILTERS = { search: '', type: 'all', category: 'all', month: 'all', sort: 'date-desc' };

export default function Transactions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { transactions, currency, deleteTransaction } = useExpenses();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [toDelete, setToDelete] = useState(null);
  const [success, setSuccess] = useState(false);

  // Show success banner after adding, then clear router state so it doesn't reappear on refresh
  useEffect(() => {
    if (location.state && location.state.added) {
      setSuccess(true);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  useEffect(() => {
    if (!success) return undefined;
    const timer = setTimeout(() => setSuccess(false), 3000);
    return () => clearTimeout(timer);
  }, [success]);

  const months = useMemo(
    () => [...new Set(transactions.map((t) => monthKey(t.date)))].sort().reverse(),
    [transactions]
  );

  const visible = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    const list = transactions.filter(
      (t) =>
        (!q || t.title.toLowerCase().includes(q)) &&
        (filters.type === 'all' || t.type === filters.type) &&
        (filters.category === 'all' || t.category === filters.category) &&
        (filters.month === 'all' || monthKey(t.date) === filters.month)
    );
    const sorters = {
      'date-desc': (a, b) => b.date.localeCompare(a.date),
      'date-asc': (a, b) => a.date.localeCompare(b.date),
      'amount-desc': (a, b) => b.amount - a.amount,
      'amount-asc': (a, b) => a.amount - b.amount,
    };
    return list.sort(sorters[filters.sort]);
  }, [transactions, filters]);

  return (
    <div className="page fit">
      {success && <div className="success">Transaction added successfully.</div>}
      <div className="toolbar">
        <SearchFilter filters={filters} onChange={setFilters} months={months} />
        <button type="button" className="btn btn-primary" onClick={() => navigate('/add-transaction')}>+ Add Transaction</button>
      </div>
      <section className="panel grow">
        <div className="panel-body">
          <TransactionList transactions={visible} currency={currency} onDelete={setToDelete} />
        </div>
      </section>
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete transaction?"
        message={toDelete ? `"${toDelete.title}" will be permanently removed.` : ''}
        confirmLabel="Delete"
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          deleteTransaction(toDelete.id);
          setToDelete(null);
        }}
      />
    </div>
  );
}
