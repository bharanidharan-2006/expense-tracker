import TransactionItem from './TransactionItem.jsx';

export default function TransactionList({ transactions, currency, onDelete, compact = false }) {
  if (transactions.length === 0) {
    return <div className="empty">No transactions to show.</div>;
  }
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            {!compact && <th>Category</th>}
            <th>Date</th>
            {!compact && <th>Type</th>}
            <th>Amount</th>
            {onDelete && <th></th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <TransactionItem key={t.id} transaction={t} currency={currency} onDelete={onDelete} compact={compact} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
