import { useExpenses } from '../context/ExpenseContext.jsx';
import { formatMoney } from '../utils/helpers.js';

export default function SummaryCards() {
  const { totals, currency } = useExpenses();
  const cards = [
    { label: 'Total Balance', value: totals.balance, cls: totals.balance < 0 ? 'expense' : 'accent' },
    { label: 'Total Income', value: totals.income, cls: 'income' },
    { label: 'Total Expenses', value: totals.expenses, cls: 'expense' },
    { label: "This Month's Expenses", value: totals.monthExpenses, cls: 'expense' },
  ];
  return (
    <section className="cards">
      {cards.map((c) => (
        <div key={c.label} className="card">
          <span className="card-label">{c.label}</span>
          <span className={`card-value ${c.cls}`}>{formatMoney(c.value, currency)}</span>
        </div>
      ))}
    </section>
  );
}
