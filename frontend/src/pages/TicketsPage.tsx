import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Filter, Plus, Search } from 'lucide-react';
import { PriorityBadge } from '../components/common/PriorityBadge';
import type { Ticket } from '../types/crm';

interface TicketsPageProps {
  tickets: Ticket[];
  customers: string[];
  onCreateTicket: () => void;
  onStatusChange?: (ticketId: string, status: Ticket['status']) => void;
}

export function TicketsPage({ tickets, customers, onCreateTicket, onStatusChange }: TicketsPageProps) {
  const [search, setSearch] = useState('');
  const [scope, setScope] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [assigneeFilter, setAssigneeFilter] = useState('All');
  const [customerFilter, setCustomerFilter] = useState('All');
  const [page, setPage] = useState(1);

  const filteredTickets = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      const matchesSearch =
        !query ||
        ticket.title.toLowerCase().includes(query) ||
        ticket.customerName.toLowerCase().includes(query) ||
        ticket.id.toLowerCase().includes(query) ||
        ticket.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesScope =
        scope === 'All' ||
        (scope === 'My Tickets' && ticket.assignee === 'Ava Ross') ||
        (scope === 'Unassigned' && ticket.assignee === 'Unassigned') ||
        (scope === 'Urgent' && ticket.priority === 'Urgent');

      const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || ticket.priority === priorityFilter;
      const matchesAssignee = assigneeFilter === 'All' || ticket.assignee === assigneeFilter;
      const matchesCustomer = customerFilter === 'All' || ticket.customerName === customerFilter;

      return matchesSearch && matchesScope && matchesStatus && matchesPriority && matchesAssignee && matchesCustomer;
    });
  }, [tickets, search, scope, statusFilter, priorityFilter, assigneeFilter, customerFilter]);

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / pageSize));
  const currentPageTickets = filteredTickets.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Tickets</p>
          <h1>Support queue</h1>
        </div>
        <button type="button" className="primary-button" onClick={onCreateTicket}>
          <Plus size={15} />
          Create ticket
        </button>
      </div>

      <section className="panel filter-panel">
        <div className="toolbar-row">
          <div className="input-with-icon">
            <Search size={16} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tickets" />
          </div>
          <button type="button" className="secondary-button">
            <Filter size={15} />
            Filters
          </button>
        </div>

        <div className="filter-row">
          <div className="segmented-control">
            {['All', 'My Tickets', 'Unassigned', 'Urgent'].map((item) => (
              <button key={item} type="button" className={scope === item ? 'active' : ''} onClick={() => setScope(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="filters-grid">
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="All">Status: All</option>
              <option value="Open">Open</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
              <option value="Escalated">Escalated</option>
            </select>

            <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
              <option value="All">Priority: All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>

            <select value={assigneeFilter} onChange={(event) => setAssigneeFilter(event.target.value)}>
              <option value="All">Assignee: All</option>
              <option value="Ava Ross">Ava Ross</option>
              <option value="Leo Martin">Leo Martin</option>
              <option value="Sana Patel">Sana Patel</option>
              <option value="Noah Chen">Noah Chen</option>
              <option value="Unassigned">Unassigned</option>
            </select>

            <select value={customerFilter} onChange={(event) => setCustomerFilter(event.target.value)}>
              <option value="All">Customer: All</option>
              {customers.map((customer) => (
                <option key={customer} value={customer}>{customer}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="panel table-panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Customer</th>
                <th>Priority</th>
                <th>Assignee</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {currentPageTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <Link to={`/tickets/${ticket.id}`} className="ticket-anchor">
                      <strong>{ticket.id}</strong>
                      <span>{ticket.title}</span>
                    </Link>
                  </td>
                  <td>{ticket.customerName}</td>
                  <td><PriorityBadge priority={ticket.priority} /></td>
                  <td>{ticket.assignee}</td>
                  <td>
                    <select value={ticket.status} onChange={(event) => onStatusChange?.(ticket.id, event.target.value as Ticket['status'])} className="inline-select">
                      <option value="Open">Open</option>
                      <option value="Pending">Pending</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Escalated">Escalated</option>
                    </select>
                  </td>
                  <td>{new Date(ticket.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-bar">
          <span>
            Showing {Math.min((page - 1) * pageSize + 1, filteredTickets.length)}-{Math.min(page * pageSize, filteredTickets.length)} of {filteredTickets.length}
          </span>
          <div className="pagination-actions">
            <button type="button" className="icon-button" onClick={() => setPage((current) => Math.max(1, current - 1))} aria-label="Previous page">
              <ChevronLeft size={16} />
            </button>
            <button type="button" className="icon-button" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} aria-label="Next page">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
