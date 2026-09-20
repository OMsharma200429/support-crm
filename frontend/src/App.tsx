import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { CreateTicketModal } from './components/common/CreateTicketModal';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { customers as initialCustomers, tickets as initialTickets } from './data/seedData';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { CustomersPage } from './pages/CustomersPage';
import { InboxPage } from './pages/InboxPage';
import { OverviewPage } from './pages/OverviewPage';
import { TicketDetailPage } from './pages/TicketDetailPage';
import { TicketsPage } from './pages/TicketsPage';
import { createApiTicket, getApiTickets, searchRecords, updateApiTicketStatus } from './services/crmService';
import type { Ticket, TicketStatus } from './types/crm';
import './App.css';

const commandRoutes: Record<string, string> = {
  Overview: '/',
  Tickets: '/tickets',
  Customers: '/customers',
  Analytics: '/analytics',
  'New ticket': '/tickets',
};

function App() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastText, setToastText] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);
  const [ticketsError, setTicketsError] = useState<string | null>(null);

  useKeyboardShortcuts({
    onToggleSearch: () => setSearchOpen((value) => !value),
  });

  const loadTickets = async () => {
    setIsLoadingTickets(true);
    setTicketsError(null);

    try {
      const response = await getApiTickets();
      setTickets(response);
    } catch {
      setTicketsError('Unable to load live ticket data. Showing cached CRM data.');
    } finally {
      setIsLoadingTickets(false);
    }
  };

  useEffect(() => {
    void loadTickets();
  }, []);

  useEffect(() => {
    if (!toastText) return undefined;
    const timeout = window.setTimeout(() => setToastText(null), 2200);
    return () => window.clearTimeout(timeout);
  }, [toastText]);

  const results = useMemo(() => searchRecords(searchQuery), [searchQuery]);

  const handleCreateTicket = async (payload: { title: string; customerName: string; priority: string; status: string; category: string }) => {
    try {
      const created = await createApiTicket(payload);

      if (created && created.ticket_id) {
        setToastText('Ticket created successfully');
        await loadTickets();
        navigate(`/tickets/${created.ticket_id}`);
        return;
      }
    } catch {
      // fall through to the local fallback below
    }

    const customer = initialCustomers.find((item) => item.name === payload.customerName || item.company === payload.customerName) ?? initialCustomers[0];
    const nextTicket: Ticket = {
      id: `T-${Math.floor(1200 + Math.random() * 350)}`,
      title: payload.title || 'Follow-up on support case',
      customerId: customer.id,
      customerName: customer.name,
      status: payload.status as TicketStatus,
      priority: payload.priority as Ticket['priority'],
      category: payload.category,
      channel: 'Web',
      assignee: 'Unassigned',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slaHours: 18,
      resolutionHours: 8,
      tags: [payload.category.toLowerCase(), 'new'],
      summary: 'New ticket created from the support desk.',
      description: 'This case was created through the CRM workflow. Review the customer details and route it to the correct owner.',
      linkedIssues: [],
      notes: ['New case created by operations.'],
      comments: [
        { id: `c-${Date.now()}`, sender: 'system', author: 'System', text: 'Ticket created.', time: 'Just now', type: 'internal' },
      ],
      activities: [{ id: `a-${Date.now()}`, type: 'Ticket created', detail: 'Case created via CRM workflow.', time: 'Just now' }],
      attachments: [],
      relatedTickets: [],
    };

    setTickets((current) => [nextTicket, ...current]);
    setToastText('Ticket created successfully');
    navigate(`/tickets/${nextTicket.id}`);
  };

  const handleStatusUpdate = async (ticketId: string, status: TicketStatus) => {
    const successful = await updateApiTicketStatus(ticketId, status);

    if (successful) {
      setTickets((current) =>
        current.map((ticket) =>
          ticket.id === ticketId
            ? { ...ticket, status, updatedAt: new Date().toISOString() }
            : ticket,
        ),
      );
      setToastText(`Updated ticket ${ticketId}`);
      return;
    }

    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status, updatedAt: new Date().toISOString() }
          : ticket,
      ),
    );
    setToastText(`Updated ticket ${ticketId}`);
  };

  const handleTicketChange = (ticketId: string, updater: (ticket: Ticket) => Ticket) => {
    setTickets((current) =>
      current.map((ticket) => (ticket.id === ticketId ? updater(ticket) : ticket)),
    );
  };

  return (
    <div className="crm-app-shell">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((value) => !value)} />

      <div className="main-panel">
        <Topbar onOpenSearch={() => setSearchOpen(true)} onCreateTicket={() => setShowCreateTicket(true)} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<OverviewPage tickets={tickets} onCreateTicket={() => setShowCreateTicket(true)} />} />
            <Route
              path="/tickets"
              element={
                <TicketsPage
                  tickets={tickets}
                  customers={initialCustomers.map((customer) => customer.name)}
                  onCreateTicket={() => setShowCreateTicket(true)}
                  onStatusChange={handleStatusUpdate}
                />
              }
            />
            <Route
              path="/tickets/:id"
              element={<TicketDetailPage tickets={tickets} isLoading={isLoadingTickets} error={ticketsError} onTicketChange={handleTicketChange} />}
            />
            <Route path="/customers" element={<CustomersPage customers={initialCustomers} />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      <CreateTicketModal open={showCreateTicket} onClose={() => setShowCreateTicket(false)} onSubmit={handleCreateTicket} />

      {searchOpen && (
        <div className="search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-modal" onClick={(event) => event.stopPropagation()}>
            <div className="search-input-container">
              <span>⌕</span>
              <input
                autoFocus
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search tickets, customers, commands"
              />
            </div>

            <div className="search-results">
              {results.commands.length > 0 && (
                <div className="search-group">
                  <p>Commands</p>
                  {results.commands.map((command) => (
                    <Link key={command} to={commandRoutes[command] ?? '/'} onClick={() => setSearchOpen(false)}>
                      {command}
                    </Link>
                  ))}
                </div>
              )}

              {results.tickets.length > 0 && (
                <div className="search-group">
                  <p>Tickets</p>
                  {results.tickets.map((ticket) => (
                    <Link key={ticket.id} to={`/tickets/${ticket.id}`} onClick={() => setSearchOpen(false)}>
                      {ticket.id} · {ticket.title}
                    </Link>
                  ))}
                </div>
              )}

              {results.customers.length > 0 && (
                <div className="search-group">
                  <p>Customers</p>
                  {results.customers.map((customer) => (
                    <Link key={customer.id} to="/customers" onClick={() => setSearchOpen(false)}>
                      {customer.name} · {customer.company}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {toastText && <div className="toast-notification">{toastText}</div>}
    </div>
  );
}

export default App;
