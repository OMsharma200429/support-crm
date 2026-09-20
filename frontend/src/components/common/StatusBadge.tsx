import type { TicketStatus } from '../../types/crm';

const statusClassMap: Record<TicketStatus, string> = {
  Open: 'status-open',
  Pending: 'status-pending',
  Resolved: 'status-resolved',
  Escalated: 'status-escalated',
};

export function StatusBadge({ status }: { status: TicketStatus }) {
  return <span className={`status-badge ${statusClassMap[status]}`}>{status}</span>;
}
