import { useState } from 'react';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, todayISO } from '../utils/helpers.js';

const initial = () => ({ title: '', amount: '', type: 'expense', category: 'Food', date: todayISO() });

export default function TransactionForm({ onSubmit }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'type') next.category = value === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0];
      return next;
    });
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required.';
    else if (form.title.trim().length > 60) e.title = 'Title must be 60 characters or fewer.';
    const amt = Number(form.amount);
    if (form.amount === '' || Number.isNaN(amt)) e.amount = 'Enter a valid amount.';
    else if (amt <= 0) e.amount = 'Amount must be greater than 0.';
    if (!['income', 'expense'].includes(form.type)) e.type = 'Select a type.';
    if (!form.category) e.category = 'Select a category.';
    if (!form.date) e.date = 'Date is required.';
    else if (form.date > todayISO()) e.date = 'Date cannot be in the future.';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    onSubmit({
      title: form.title.trim(),
      amount: Math.round(Number(form.amount) * 100) / 100,
      type: form.type,
      category: form.category,
      date: form.date,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label>
        Title
        <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Groceries" />
        {errors.title && <span className="error">{errors.title}</span>}
      </label>
      <label>
        Amount
        <input name="amount" type="number" step="0.01" min="0" value={form.amount} onChange={handleChange} placeholder="0.00" />
        {errors.amount && <span className="error">{errors.amount}</span>}
      </label>
      <label>
        Type
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        {errors.type && <span className="error">{errors.type}</span>}
      </label>
      <label>
        Category
        <select name="category" value={form.category} onChange={handleChange}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.category && <span className="error">{errors.category}</span>}
      </label>
      <label>
        Date
        <input name="date" type="date" max={todayISO()} value={form.date} onChange={handleChange} />
        {errors.date && <span className="error">{errors.date}</span>}
      </label>
      <button type="submit" className="btn btn-primary">Save Transaction</button>
    </form>
  );
}
