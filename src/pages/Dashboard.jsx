import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext.jsx';
import SummaryCards from '../components/SummaryCards.jsx';
import TransactionList from '../components/TransactionList.jsx';
import MonthlySummary from '../components/MonthlySummary.jsx';

export default function Dashboard() {
  const navigate = useNavigate();
  const { transactions, currency } = useExpenses();
  const recent = [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);

  return (
    <div className="page fit">
      <SummaryCards />
      <div className="dash-grid">
        <section className="panel">
          <div className="panel-head">
            <h2>Recent Transactions</h2>
            <div className="panel-actions">
              <button type="button" className="btn btn-ghost btn-small" onClick={() => navigate('/transactions')}>View all</button>
              <button type="button" className="btn btn-primary btn-small" onClick={() => navigate('/add-transaction')}>+ Add Transaction</button>
            </div>
          </div>
          <div className="panel-body">
            <TransactionList transactions={recent} currency={currency} compact />
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <h2>Monthly Spending</h2>
          </div>
          <div className="panel-body">
            <MonthlySummary />
          </div>
        </section>
      </div>
    </div>
  );
}
