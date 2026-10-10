import { useMemo, useState } from 'react';
import { useExpenses } from '../context/ExpenseContext.jsx';
import { currentMonthKey, formatMoney, monthKey, monthLabel, summarize } from '../utils/helpers.js';

export default function Reports() {
  const { transactions, currency } = useExpenses();
  const [month, setMonth] = useState(currentMonthKey());

  const stats = useMemo(() => summarize(transactions.filter((t) => monthKey(t.date) === month)), [transactions, month]);

  const categories = useMemo(
    () => Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1]),
    [stats]
  );

  return (
    <div className="page fit">
      <div className="toolbar">
        <label className="inline-label">
          Month
          <input type="month" value={month} onChange={(e) => e.target.value && setMonth(e.target.value)} />
        </label>
        <span className="muted">{monthLabel(month)}</span>
      </div>
      <section className="cards three">
        <div className="card">
          <span className="card-label">Monthly Income</span>
          <span className="card-value income">{formatMoney(stats.income, currency)}</span>
        </div>
        <div className="card">
          <span className="card-label">Monthly Expenses</span>
          <span className="card-value expense">{formatMoney(stats.expenses, currency)}</span>
        </div>
        <div className="card">
          <span className="card-label">Monthly Balance</span>
          <span className={`card-value ${stats.balance < 0 ? 'expense' : 'accent'}`}>{formatMoney(stats.balance, currency)}</span>
        </div>
      </section>
      <section className="panel grow">
        <div className="panel-head">
          <h2>Expenses by Category</h2>
        </div>
        <div className="panel-body">
          {categories.length === 0 ? (
            <div className="empty">No expenses recorded for this month.</div>
          ) : (
            <div className="bars">
              {categories.map(([cat, total]) => {
                const pct = stats.expenses ? (total / stats.expenses) * 100 : 0;
                return (
                  <div key={cat} className="bar-row">
                    <span className="bar-label wide">{cat}</span>
                    <div className="bar-track">
                      <div className="bar-fill accent-bg" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="bar-value">
                      {formatMoney(total, currency)} <small>({pct.toFixed(0)}%)</small>
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
