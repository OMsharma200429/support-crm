import { customers, overviewMetrics, tickets as seedTickets } from '../data/seedData';
import type { Customer, Ticket, TicketStatus } from '../types/crm';

const API_BASE_URL = 'http://127.0.0.1:8001';

const normalizeStatus = (value?: string): TicketStatus => {
  const normalized = (value ?? 'Open').toLowerCase();

  if (normalized === 'pending') return 'Pending';
  if (normalized === 'resolved') return 'Resolved';
  if (normalized === 'escalated') return 'Escalated';

  return 'Open';
};

const normalizePriority = (value?: string): Ticket['priority'] => {
  const normalized = (value ?? '').toLowerCase();

  if (normalized === 'low') return 'Low';
  if (normalized === 'medium') return 'Medium';
  if (normalized === 'high') return 'High';
  if (normalized === 'urgent') return 'Urgent';

  return 'Medium';
};

const parseListField = (value: unknown): string[] => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.map((entry) => String(entry)).filter(Boolean);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];

    try {
      const parsed = JSON.parse(trimmed);
      return Array.isArray(parsed) ? parsed.map((entry) => String(entry)).filter(Boolean) : [String(parsed)];
    } catch {
      return trimmed
        .split(/[\s,]+/)
        .map((entry) => entry.trim())
        .filter(Boolean);
    }
  }

  return [String(value)];
};

const getValidCustomerEmail = (customerName: string): string => {
  const normalized = customerName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/^\.+|\.+$/g, '') || 'customer';

  return `${normalized}@example.com`;
};

const mapApiTicketToUiTicket = (payload: {
  ticket_id?: string;
  id?: string;
  subject?: string;
  title?: string;
  customer_name?: string;
  customerName?: string;
  customer_email?: string;
  customerEmail?: string;
  company?: string;
  description?: string;
  status?: string;
  priority?: string;
  assignee?: string;
  assignee_name?: string;
  category?: string;
  channel?: string;
  tags?: string[] | string | null;
  related_tickets?: string[] | string | null;
  created_at?: string;
  updated_at?: string;
  notes?: Array<{ note_text?: string; text?: string }> | string[];
}): Ticket => {
  const ticketId = payload.ticket_id ?? payload.id ?? 'T-0000';
  const subject = payload.subject ?? payload.title ?? 'Support case';
  const customerName = payload.customer_name ?? payload.customerName ?? 'Customer';
  const customerId = `c-${(customerName || 'customer').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'customer'}`;
  const description = payload.description ?? subject;
  const createdAt = payload.created_at ?? new Date().toISOString();
  const updatedAt = payload.updated_at ?? createdAt;
  const notes = Array.isArray(payload.notes)
    ? payload.notes.map((note) => typeof note === 'string' ? note : (note.note_text ?? note.text ?? 'Updated ticket'))
    : [];
  const tags = parseListField(payload.tags).length ? parseListField(payload.tags) : [
    (subject.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean).slice(0, 2).join('-') || 'support'),
  ];
  const relatedTickets = parseListField(payload.related_tickets);

  return {
    id: ticketId,
    title: subject,
    customerId,
    customerName,
    status: normalizeStatus(payload.status),
    priority: normalizePriority(payload.priority ?? (payload.status === 'Escalated' ? 'Urgent' : undefined)),
    category: payload.category ?? 'Technical',
    channel: payload.channel ?? 'Web',
    assignee: payload.assignee ?? payload.assignee_name ?? 'Unassigned',
    createdAt,
    updatedAt,
    slaHours: 18,
    resolutionHours: 8,
    tags,
    summary: description,
    description,
    linkedIssues: relatedTickets,
    comments: notes.length
      ? notes.map((note, index) => ({
          id: `api-comment-${index}`,
          sender: 'system',
          author: 'System',
          text: note,
          time: new Date(updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          type: 'internal',
        }))
      : [{
          id: 'api-comment-0',
          sender: 'system',
          author: 'System',
          text: 'Ticket created via API sync.',
          time: new Date(updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          type: 'internal',
        }],
    notes,
    activities: [{
      id: `api-activity-${ticketId}`,
      type: 'Sync',
      detail: 'Ticket synced from backend API.',
      time: new Date(updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    }],
    attachments: [],
    relatedTickets,
  };
};

export const getSortedTickets = (): Ticket[] =>
  [...seedTickets].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

export const getTicketById = (ticketId: string): Ticket | undefined =>
  getSortedTickets().find((ticket) => ticket.id === ticketId);

export const getCustomers = (): Customer[] => [...customers];

export const getCustomerById = (customerId: string): Customer | undefined =>
  getCustomers().find((customer) => customer.id === customerId);

export const getOverviewStats = () => overviewMetrics;

export const getApiTickets = async (): Promise<Ticket[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tickets`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return getSortedTickets();
    }

    return data.map((item) => mapApiTicketToUiTicket(item));
  } catch {
    return getSortedTickets();
  }
};

export const createApiTicket = async (payload: { title: string; customerName: string; priority: string; status: string; category: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: payload.customerName,
        customer_email: getValidCustomerEmail(payload.customerName),
        subject: payload.title,
        description: `${payload.category} issue reported by ${payload.customerName}.`,
      }),
    });

    if (!response.ok) {
      throw new Error(`Could not create ticket: ${response.status}`);
    }

    return response.json();
  } catch {
    return null;
  }
};

export const updateApiTicketStatus = async (ticketId: string, status: TicketStatus) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`Could not update ticket: ${response.status}`);
    }

    return true;
  } catch {
    return false;
  }
};

export const getFilteredTickets = ({
  search = '',
  status = 'All',
  priority = 'All',
  assignee = 'All',
  customer = 'All',
  scope = 'All',
}: {
  search?: string;
  status?: string;
  priority?: string;
  assignee?: string;
  customer?: string;
  scope?: string;
}) => {
  const query = search.trim().toLowerCase();

  return getSortedTickets().filter((ticket) => {
    const matchesSearch =
      !query ||
      ticket.title.toLowerCase().includes(query) ||
      ticket.customerName.toLowerCase().includes(query) ||
      ticket.id.toLowerCase().includes(query) ||
      ticket.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesStatus = status === 'All' || ticket.status === status;
    const matchesPriority = priority === 'All' || ticket.priority === priority;
    const matchesAssignee = assignee === 'All' || ticket.assignee === assignee;
    const matchesCustomer = customer === 'All' || ticket.customerName === customer;

    const matchesScope =
      scope === 'All' ||
      (scope === 'My Tickets' && ticket.assignee === 'Ava Ross') ||
      (scope === 'Unassigned' && ticket.assignee === 'Unassigned') ||
      (scope === 'Urgent' && ticket.priority === 'Urgent');

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee && matchesCustomer && matchesScope;
  });
};

export const searchRecords = (query: string) => {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return {
      commands: ['Overview', 'Tickets', 'Customers', 'Analytics', 'New ticket'],
      tickets: [],
      customers: [],
    };
  }

  const matchesTickets = getSortedTickets().filter((ticket) =>
    [ticket.title, ticket.customerName, ticket.id, ...ticket.tags].some((value) =>
      value.toLowerCase().includes(normalized),
    ),
  );

  const matchesCustomers = getCustomers().filter((customer) =>
    [customer.name, customer.company, customer.email].some((value) => value.toLowerCase().includes(normalized)),
  );

  const commands = ['Overview', 'Tickets', 'Customers', 'Analytics', 'New ticket'].filter((command) =>
    command.toLowerCase().includes(normalized),
  );

  return {
    commands,
    tickets: matchesTickets.slice(0, 5),
    customers: matchesCustomers.slice(0, 5),
  };
};
