import {
  customers,
  overviewMetrics,
  tickets as seedTickets,
} from '../data/seedData';

import type {
  Customer,
  Ticket,
  TicketStatus,
} from '../types/crm';

const API_BASE_URL =
  'https://support-crm-production-9149.up.railway.app';


// =====================================================
// STATUS NORMALIZER
// =====================================================

const normalizeStatus = (
  value?: string
): TicketStatus => {
  const normalized = (value ?? 'Open').toLowerCase();

  if (normalized === 'pending') {
    return 'Pending';
  }

  if (normalized === 'resolved') {
    return 'Resolved';
  }

  if (normalized === 'escalated') {
    return 'Escalated';
  }

  return 'Open';
};


// =====================================================
// PRIORITY NORMALIZER
// =====================================================

const normalizePriority = (
  value?: string
): Ticket['priority'] => {
  const normalized = (value ?? '').toLowerCase();

  if (normalized === 'low') {
    return 'Low';
  }

  if (normalized === 'medium') {
    return 'Medium';
  }

  if (normalized === 'high') {
    return 'High';
  }

  if (normalized === 'urgent') {
    return 'Urgent';
  }

  return 'Medium';
};


// =====================================================
// PARSE LIST FIELD
// =====================================================

const parseListField = (
  value: unknown
): string[] => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map((entry) => String(entry))
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!trimmed) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmed);

      if (Array.isArray(parsed)) {
        return parsed
          .map((entry) => String(entry))
          .filter(Boolean);
      }

      return [String(parsed)];
    } catch {
      return trimmed
        .split(/[\s,]+/)
        .map((entry) => entry.trim())
        .filter(Boolean);
    }
  }

  return [String(value)];
};


// =====================================================
// CUSTOMER EMAIL
// =====================================================

const getValidCustomerEmail = (
  customerName: string
): string => {
  const normalized =
    customerName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '.')
      .replace(/^\.+|\.+$/g, '') ||
    'customer';

  return `${normalized}@example.com`;
};


// =====================================================
// API TICKET MAPPER
// =====================================================

const mapApiTicketToUiTicket = (
  payload: {
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

    notes?:
      | Array<{
          note_text?: string;
          text?: string;
        }>
      | string[];
  }
): Ticket => {

  const ticketId =
    payload.ticket_id ??
    payload.id ??
    'T-0000';

  const subject =
    payload.subject ??
    payload.title ??
    'Support case';

  const customerName =
    payload.customer_name ??
    payload.customerName ??
    'Customer';

  const customerId =
    `c-${customerName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'customer'}`;

  const description =
    payload.description ??
    subject;

  const createdAt =
    payload.created_at ??
    new Date().toISOString();

  const updatedAt =
    payload.updated_at ??
    createdAt;


  // -------------------------
  // NOTES
  // -------------------------

  const notes = Array.isArray(payload.notes)
    ? payload.notes.map((note) => {
        if (typeof note === 'string') {
          return note;
        }

        return (
          note.note_text ??
          note.text ??
          'Updated ticket'
        );
      })
    : [];


  // -------------------------
  // TAGS
  // -------------------------

  const parsedTags =
    parseListField(payload.tags);

  const tags =
    parsedTags.length > 0
      ? parsedTags
      : [
          subject
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, ' ')
            .trim()
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .join('-') || 'support',
        ];


  // -------------------------
  // RELATED TICKETS
  // -------------------------

  const relatedTickets =
    parseListField(
      payload.related_tickets
    );


  // -------------------------
  // RETURN UI TICKET
  // -------------------------

  return {
    id: ticketId,

    title: subject,

    customerId,
    customerName,

    status: normalizeStatus(
      payload.status
    ),

    priority: normalizePriority(
      payload.priority
    ),

    category:
      payload.category ??
      'Technical',

    channel:
      payload.channel ??
      'Web',

    assignee:
      payload.assignee ??
      payload.assignee_name ??
      'Unassigned',

    createdAt,
    updatedAt,

    slaHours: 18,
    resolutionHours: 8,

    tags,

    summary: description,

    description,

    linkedIssues:
      relatedTickets,

    comments:
      notes.length > 0
        ? notes.map((note, index) => ({
            id: `api-comment-${index}`,
            sender: 'system',
            author: 'System',
            text: note,

            time: new Date(
              updatedAt
            ).toLocaleDateString(
              undefined,
              {
                month: 'short',
                day: 'numeric',
              }
            ),

            type: 'internal',
          }))
        : [
            {
              id: 'api-comment-0',
              sender: 'system',
              author: 'System',
              text:
                'Ticket created via API sync.',

              time: new Date(
                updatedAt
              ).toLocaleDateString(
                undefined,
                {
                  month: 'short',
                  day: 'numeric',
                }
              ),

              type: 'internal',
            },
          ],

    notes,

    activities: [
      {
        id: `api-activity-${ticketId}`,

        type: 'Sync',

        detail:
          'Ticket synced from backend API.',

        time: new Date(
          updatedAt
        ).toLocaleDateString(
          undefined,
          {
            month: 'short',
            day: 'numeric',
          }
        ),
      },
    ],

    attachments: [],

    relatedTickets,
  };
};


// =====================================================
// LOCAL TICKETS
// =====================================================

export const getSortedTickets = (): Ticket[] => {
  return [...seedTickets].sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() -
      new Date(a.updatedAt).getTime()
  );
};


export const getTicketById = (
  ticketId: string
): Ticket | undefined => {
  return getSortedTickets().find(
    (ticket) => ticket.id === ticketId
  );
};


// =====================================================
// CUSTOMERS
// =====================================================

export const getCustomers = (): Customer[] => {
  return [...customers];
};


export const getCustomerById = (
  customerId: string
): Customer | undefined => {
  return getCustomers().find(
    (customer) =>
      customer.id === customerId
  );
};


// =====================================================
// OVERVIEW
// =====================================================

export const getOverviewStats = () => {
  return overviewMetrics;
};


// =====================================================
// GET API TICKETS
// =====================================================

export const getApiTickets = async (): Promise<
  Ticket[]
> => {

  try {

    const response = await fetch(
      `${API_BASE_URL}/api/tickets`
    );

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}`
      );
    }

    const data =
      await response.json();

    if (!Array.isArray(data)) {
      return getSortedTickets();
    }

    return data.map(
      (item) =>
        mapApiTicketToUiTicket(item)
    );

  } catch (error) {

    console.error(
      'Failed to load tickets:',
      error
    );

    return getSortedTickets();
  }
};


// =====================================================
// CREATE API TICKET
// =====================================================

export const createApiTicket = async (
  payload: {
    title: string;
    customerName: string;
    priority: string;
    status: string;
    category: string;
  }
) => {

  try {

    const response = await fetch(
      `${API_BASE_URL}/api/tickets`,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          customer_name:
            payload.customerName,

          customer_email:
            getValidCustomerEmail(
              payload.customerName
            ),

          subject:
            payload.title,

          description:
            `${payload.category} issue reported by ${payload.customerName}.`,

          status:
            payload.status,

          priority:
            payload.priority,
        }),
      }
    );


    if (!response.ok) {
      throw new Error(
        `Could not create ticket: ${response.status}`
      );
    }


    return await response.json();

  } catch (error) {

    console.error(
      'Ticket creation failed:',
      error
    );

    return null;
  }
};


// =====================================================
// UPDATE API TICKET
// =====================================================

export const updateApiTicket = async (
  ticketId: string,
  payload: {
    status?: TicketStatus;
    priority?: string;
    assignee?: string;
    company?: string;
    tags?: string[];
    related_tickets?: string[];
    notes?: string;
  }
) => {

  try {

    const response = await fetch(
      `${API_BASE_URL}/api/tickets/${ticketId}`,
      {
        method: 'PUT',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify(
          payload
        ),
      }
    );


    if (!response.ok) {
      throw new Error(
        `Could not update ticket: ${response.status}`
      );
    }


    return await response.json();

  } catch (error) {

    console.error(
      'Ticket update failed:',
      error
    );

    return null;
  }
};


// =====================================================
// UPDATE ONLY STATUS
// IMPORTANT FOR App.tsx
// =====================================================

export const updateApiTicketStatus = async (
  ticketId: string,
  status: TicketStatus
) => {

  return updateApiTicket(
    ticketId,
    {
      status,
    }
  );
};


// =====================================================
// FILTER TICKETS
// =====================================================

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

  const query =
    search.trim().toLowerCase();


  return getSortedTickets().filter(
    (ticket) => {

      const matchesSearch =
        !query ||

        ticket.title
          .toLowerCase()
          .includes(query) ||

        ticket.customerName
          .toLowerCase()
          .includes(query) ||

        ticket.id
          .toLowerCase()
          .includes(query) ||

        ticket.tags.some(
          (tag) =>
            tag
              .toLowerCase()
              .includes(query)
        );


      const matchesStatus =
        status === 'All' ||
        ticket.status === status;


      const matchesPriority =
        priority === 'All' ||
        ticket.priority === priority;


      const matchesAssignee =
        assignee === 'All' ||
        ticket.assignee === assignee;


      const matchesCustomer =
        customer === 'All' ||
        ticket.customerName === customer;


      const matchesScope =
        scope === 'All' ||

        (
          scope === 'My Tickets' &&
          ticket.assignee === 'Ava Ross'
        ) ||

        (
          scope === 'Unassigned' &&
          ticket.assignee === 'Unassigned'
        ) ||

        (
          scope === 'Urgent' &&
          ticket.priority === 'Urgent'
        );


      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesAssignee &&
        matchesCustomer &&
        matchesScope
      );
    }
  );
};


// =====================================================
// SEARCH
// =====================================================

export const searchRecords = (
  query: string
) => {

  const normalized =
    query.trim().toLowerCase();


  if (!normalized) {

    return {
      commands: [
        'Overview',
        'Tickets',
        'Customers',
        'Analytics',
        'New ticket',
      ],

      tickets: [],

      customers: [],
    };
  }


  const matchesTickets =
    getSortedTickets().filter(
      (ticket) =>
        [
          ticket.title,
          ticket.customerName,
          ticket.id,
          ...ticket.tags,
        ].some(
          (value) =>
            value
              .toLowerCase()
              .includes(normalized)
        )
    );


  const matchesCustomers =
    getCustomers().filter(
      (customer) =>
        [
          customer.name,
          customer.company,
          customer.email,
        ].some(
          (value) =>
            value
              .toLowerCase()
              .includes(normalized)
        )
    );


  const commands = [
    'Overview',
    'Tickets',
    'Customers',
    'Analytics',
    'New ticket',
  ].filter(
    (command) =>
      command
        .toLowerCase()
        .includes(normalized)
  );


  return {
    commands,

    tickets:
      matchesTickets.slice(0, 5),

    customers:
      matchesCustomers.slice(0, 5),
  };
};
