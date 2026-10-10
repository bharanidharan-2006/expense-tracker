import { formatDate, formatMoney } from '../utils/helpers.js';

export default function TransactionItem({ transaction: t, currency, onDelete, compact }) {
  const sign = t.type === 'income' ? '+' : '-';
  return (
    <tr>
      <td className="cell-title">{t.title}</td>
      {!compact && (
        <td>
          <span className="chip">{t.category}</span>
        </td>
      )}
      <td className="muted">{formatDate(t.date)}</td>
      {!compact && (
        <td>
          <span className={`badge ${t.type}`}>{t.type}</span>
        </td>
      )}
      <td className={`amount ${t.type}`}>
        {sign}
        {formatMoney(t.amount, currency)}
      </td>
      {onDelete && (
        <td className="cell-action">
          <button type="button" className="btn btn-small btn-danger-outline" onClick={() => onDelete(t)}>
            Delete
          </button>
        </td>
      )}
    </tr>
  );
}
