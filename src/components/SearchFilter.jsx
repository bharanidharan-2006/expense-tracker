import { ALL_CATEGORIES, monthLabel } from '../utils/helpers.js';

export default function SearchFilter({ filters, onChange, months }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });
  return (
    <div className="filters">
      <input type="search" placeholder="Search by title..." value={filters.search} onChange={set('search')} />
      <select value={filters.type} onChange={set('type')} aria-label="Type">
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select value={filters.category} onChange={set('category')} aria-label="Category">
        <option value="all">All categories</option>
        {ALL_CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select value={filters.month} onChange={set('month')} aria-label="Month">
        <option value="all">All months</option>
        {months.map((m) => (
          <option key={m} value={m}>{monthLabel(m)}</option>
        ))}
      </select>
      <select value={filters.sort} onChange={set('sort')} aria-label="Sort">
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="amount-desc">Amount: high to low</option>
        <option value="amount-asc">Amount: low to high</option>
      </select>
    </div>
  );
}
