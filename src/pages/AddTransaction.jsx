import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext.jsx';
import TransactionForm from '../components/TransactionForm.jsx';

export default function AddTransaction() {
  const navigate = useNavigate();
  const { addTransaction } = useExpenses();

  const handleSubmit = (data) => {
    addTransaction(data);
    navigate('/transactions', { state: { added: true } });
  };

  return (
    <div className="page">
      <section className="panel form-panel">
        <div className="panel-head">
          <h2>New Transaction</h2>
        </div>
        <div className="panel-body">
          <TransactionForm onSubmit={handleSubmit} />
        </div>
      </section>
    </div>
  );
}
