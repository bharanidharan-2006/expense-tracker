import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import { CURRENCIES } from '../utils/helpers.js';

export default function Settings() {
  const { currency, setCurrency, clearTransactions, transactions } = useExpenses();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="page">
      {message && <div className="success">{message}</div>}
      <section className="panel settings-panel">
        <div className="panel-head">
          <h2>Preferences</h2>
        </div>
        <div className="panel-body">
          <label className="inline-label">
            Currency symbol
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
      </section>
      <section className="panel settings-panel">
        <div className="panel-head">
          <h2>Danger Zone</h2>
        </div>
        <div className="panel-body">
          <p className="muted">You have {transactions.length} saved transaction(s). This action cannot be undone.</p>
          <button type="button" className="btn btn-danger" disabled={transactions.length === 0} onClick={() => setConfirmOpen(true)}>
            Clear All Transactions
          </button>
        </div>
      </section>
      <ConfirmDialog
        open={confirmOpen}
        title="Clear all transactions?"
        message="Every saved transaction will be permanently deleted."
        confirmLabel="Clear All"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          clearTransactions();
          setConfirmOpen(false);
          setMessage('All transactions cleared.');
          setTimeout(() => setMessage(''), 3000);
        }}
      />
    </div>
  );
}
