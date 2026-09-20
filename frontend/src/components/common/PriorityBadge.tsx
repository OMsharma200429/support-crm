import type { TicketPriority } from '../../types/crm';

const priorityClassMap: Record<TicketPriority, string> = {
  Low: 'priority-low',
  Medium: 'priority-medium',
  High: 'priority-high',
  Urgent: 'priority-urgent',
};

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  return <span className={`priority-badge ${priorityClassMap[priority]}`}>{priority}</span>;
}
