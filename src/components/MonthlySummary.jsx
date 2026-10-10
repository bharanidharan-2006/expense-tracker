import { useMemo } from 'react';
import { useExpenses } from '../context/ExpenseContext.jsx';
import { formatMoney, monthKey, shortMonthLabel, summarize } from '../utils/helpers.js';

// Expense totals for the last 6 months shown as CSS bars
export default function MonthlySummary() {
  const { transactions, currency } = useExpenses();

  const rows = useMemo(() => {
    const now = new Date();
    const keys = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      keys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    }
    const data = keys.map((k) => ({
      key: k,
      expenses: summarize(transactions.filter((t) => monthKey(t.date) === k)).expenses,
    }));
    const max = Math.max(...data.map((d) => d.expenses), 1);
    return data.map((d) => ({ ...d, pct: (d.expenses / max) * 100 }));
  }, [transactions]);

  return (
    <div className="bars">
      {rows.map((r) => (
        <div key={r.key} className="bar-row">
          <span className="bar-label">{shortMonthLabel(r.key)}</span>
          <div className="bar-track">
            <div className="bar-fill expense-bg" style={{ width: `${r.pct}%` }} />
          </div>
          <span className="bar-value">{formatMoney(r.expenses, currency)}</span>
        </div>
      ))}
    </div>
  );
}
