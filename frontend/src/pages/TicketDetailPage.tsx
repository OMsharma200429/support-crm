import { Paperclip, SendHorizonal, Sparkles } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import { customers } from '../data/seedData';
import { updateApiTicket } from '../services/crmService';
import type { Ticket } from '../types/crm';

const commentOrder = ['customer', 'agent', 'system'];

interface TicketDetailPageProps {
  tickets: Ticket[];
  isLoading?: boolean;
  error?: string | null;
  onTicketChange?: (ticketId: string, updater: (ticket: Ticket) => Ticket) => void;
}

export function TicketDetailPage({ tickets, isLoading = false, error = null, onTicketChange }: TicketDetailPageProps) {
  const { id } = useParams();
  const ticket = tickets.find((item) => item.id === id);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  const customer = ticket
    ? customers.find((item) => item.id === ticket.customerId) ?? {
        id: ticket.customerId,
        name: ticket.customerName,
        company: ticket.customerName,
        email: `${ticket.customerName.toLowerCase().replace(/[^a-z0-9]+/g, '.')}@supportcrm.local`,
        phone: '—',
        plan: 'Standard',
        totalSpend: 0,
        openTickets: 1,
        status: 'Active',
        region: 'Remote',
        lastActive: ticket.updatedAt,
        segment: 'Customer',
        healthScore: 88,
        notes: 'Customer information synced from the active support ticket.',
      }
    : undefined;
  const [composer, setComposer] = useState('');

 const handleSendNote = async () => {
  if (!ticket || !composer.trim() || !onTicketChange) return;

  const cleanText = composer.trim();

  const result = await updateApiTicket(ticket.id, {
    notes: cleanText,
  });

  if (!result) {
    alert('Failed to save note. Please try again.');
    return;
  }

  const now = new Date();

  onTicketChange(ticket.id, (currentTicket) => ({
    ...currentTicket,
    updatedAt: result.updated_at ?? now.toISOString(),
    comments: [
      ...currentTicket.comments,
      {
        id: `note-${Date.now()}`,
        sender: 'agent',
        author: 'Ash Scott',
        text: cleanText,
        time: 'Just now',
        type: 'internal',
      },
    ],
    notes: [...currentTicket.notes, cleanText],
    activities: [
      {
        id: `activity-${Date.now()}`,
        type: 'Note added',
        detail: 'Internal note added by support team.',
        time: now.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        }),
      },
      ...currentTicket.activities,
    ],
  }));

  setComposer('');
};

  const progress = useMemo(() => {
    if (!ticket) return 0;
    const used = Math.max(0, ticket.slaHours - ticket.resolutionHours);
    return Math.min(100, Math.round((used / ticket.slaHours) * 100));
  }, [ticket]);

  if (isLoading) {
    return <div className="page-shell"><section className="panel empty-state"><h2>Loading ticket…</h2><p>Please wait while the live ticket data is loaded.</p></section></div>;
  }

  if (!ticket) {
    return <div className="page-shell"><section className="panel empty-state"><h2>Ticket not found</h2>{error ? <p>{error}</p> : null}<Link to="/tickets">Back to tickets</Link></section></div>;
  }

  const activityRows = [...ticket.comments].sort((a, b) => commentOrder.indexOf(a.sender) - commentOrder.indexOf(b.sender));

  return (
    <div className="page-shell">
      <div className="page-header align-start">
        <div>
          <p className="eyebrow">Ticket detail</p>
          <h1>{ticket.title}</h1>
        </div>
        <div className="ticket-header-meta">
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
        </div>
      </div>

      <div className="ticket-detail-layout">
        <div className="detail-column">
          <section className="panel compact-panel">
            <p className="eyebrow">Ticket metadata</p>
            <div className="meta-list">
              <div><span>Ticket</span><strong>{ticket.id}</strong></div>
              <div><span>Customer</span><strong>{ticket.customerName}</strong></div>
              <div><span>Assigned</span><strong>{ticket.assignee}</strong></div>
              <div><span>Channel</span><strong>{ticket.channel}</strong></div>
              <div><span>Category</span><strong>{ticket.category}</strong></div>
              <div><span>Created</span><strong>{new Date(ticket.createdAt).toLocaleDateString()}</strong></div>
            </div>
          </section>

          <section className="panel compact-panel">
            <div className="panel-header split-header">
              <div>
                <p className="eyebrow">SLA</p>
                <h2>{ticket.slaHours}h target</h2>
              </div>
              <span className="pill">{progress}%</span>
            </div>
            <div className="progress-bar"><span style={{ width: `${progress}%` }} /></div>
            <div className="meta-inline">
              <span>Current: {Math.max(0, ticket.slaHours - ticket.resolutionHours)}h remaining</span>
              <span>Resolution: {ticket.resolutionHours}h</span>
            </div>
          </section>

          <section className="panel compact-panel">
            <p className="eyebrow">Tags</p>
            <div className="tag-list">
              {ticket.tags.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)}
            </div>
          </section>

          <section className="panel compact-panel">
            <p className="eyebrow">Linked issues</p>
            <div className="issue-list">
              {ticket.linkedIssues.map((issue) => (
                <span key={issue} className="issue-pill">{issue}</span>
              ))}
            </div>
          </section>
        </div>

        <div className="detail-column main-column">
          <section className="panel compact-panel">
            <div className="panel-header split-header">
              <div>
                <p className="eyebrow">Conversation</p>
                <h2>Customer and agent timeline</h2>
              </div>
              <button type="button" className="secondary-button small" onClick={() => composerRef.current?.focus()}>Add note</button>
            </div>

            <div className="timeline-list">
              {activityRows.map((item) => (
                <div key={item.id} className={`message-item ${item.sender}`}>
                  <div className="message-header">
                    <strong>{item.author}</strong>
                    <span>{item.time}</span>
                  </div>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="panel compact-panel">
            <div className="panel-header split-header">
              <div>
                <p className="eyebrow">Composer</p>
                <h2>Public reply / internal note</h2>
              </div>
            </div>
            <textarea ref={composerRef} value={composer} onChange={(event) => setComposer(event.target.value)} placeholder="Reply to customer or leave an internal note..." />
            <div className="composer-actions">
              <div className="attachment-chip">
                <Paperclip size={14} />
                Attachment preview
              </div>
              <button type="button" className="primary-button compact" onClick={handleSendNote} disabled={!composer.trim()}>
                <SendHorizonal size={15} />
                Send
              </button>
            </div>
          </section>
        </div>

        <div className="detail-column">
          <section className="panel compact-panel">
            <p className="eyebrow">Customer profile</p>
            <div className="customer-card-inline">
              <div className="mini-avatar large">{customer?.name.slice(0, 2).toUpperCase() ?? 'NA'}</div>
              <div>
                <strong>{customer?.name}</strong>
                <span>{customer?.company}</span>
              </div>
            </div>
            <div className="meta-list narrow">
              <div><span>Plan</span><strong>{customer?.plan}</strong></div>
              <div><span>Open tickets</span><strong>{customer?.openTickets}</strong></div>
              <div><span>Spend</span><strong>${customer?.totalSpend.toLocaleString()}</strong></div>
              <div><span>Health</span><strong>{customer?.healthScore}%</strong></div>
            </div>
          </section>

          <section className="panel compact-panel">
            <p className="eyebrow">System activity</p>
            <ul className="activity-list">
              {ticket.activities.map((activity) => (
                <li key={activity.id}>
                  <Sparkles size={14} />
                  <div>
                    <strong>{activity.type}</strong>
                    <span>{activity.detail}</span>
                    <small>{activity.time}</small>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel compact-panel">
            <p className="eyebrow">Related tickets</p>
            <div className="related-list">
              {ticket.relatedTickets.length ? ticket.relatedTickets.map((relatedTicketId) => (
                <Link key={relatedTicketId} to={`/tickets/${relatedTicketId}`} className="related-link">{relatedTicketId}</Link>
              )) : <span className="empty-text">No linked cases</span>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
