import { useLocation } from 'react-router-dom';

const TITLES = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/add-transaction': 'Add Transaction',
  '/reports': 'Monthly Reports',
  '/settings': 'Settings',
};

export default function Header() {
  const { pathname } = useLocation();
  const today = new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <header className="header">
      <h1>{TITLES[pathname] || 'Dashboard'}</h1>
      <span className="header-date">{today}</span>
    </header>
  );
}
