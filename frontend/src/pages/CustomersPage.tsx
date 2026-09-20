import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Customer } from '../types/crm';

interface CustomersPageProps {
  customers: Customer[];
}

export function CustomersPage({ customers }: CustomersPageProps) {
  const [search, setSearch] = useState('');

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return customers.filter((customer) =>
      !query ||
      customer.name.toLowerCase().includes(query) ||
      customer.company.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      customer.region.toLowerCase().includes(query),
    );
  }, [customers, search]);

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Customers</p>
          <h1>Customer directory</h1>
        </div>
      </div>

      <section className="panel filter-panel">
        <div className="input-with-icon big">
          <Search size={16} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search company, customer, email" />
        </div>
      </section>

      <section className="customer-grid">
        {filteredCustomers.map((customer) => (
          <article key={customer.id} className="panel customer-card">
            <div className="customer-topline">
              <div className="mini-avatar large">{customer.name.slice(0, 2).toUpperCase()}</div>
              <div>
                <strong>{customer.name}</strong>
                <span>{customer.company}</span>
              </div>
            </div>

            <div className="customer-stats">
              <div>
                <span>Open tickets</span>
                <strong>{customer.openTickets}</strong>
              </div>
              <div>
                <span>Total spend</span>
                <strong>${customer.totalSpend.toLocaleString()}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{customer.status}</strong>
              </div>
            </div>

            <div className="customer-meta">
              <span>{customer.region}</span>
              <span>{customer.plan}</span>
              <span>{customer.lastActive}</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
