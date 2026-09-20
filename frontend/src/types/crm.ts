export type TicketStatus = 'Open' | 'Pending' | 'Resolved' | 'Escalated';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type CustomerStatus = 'Active' | 'At Risk' | 'VIP' | 'Paused';

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  plan: string;
  totalSpend: number;
  openTickets: number;
  status: CustomerStatus;
  region: string;
  lastActive: string;
  segment: string;
  healthScore: number;
  notes: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  team: string;
  availability: string;
  responseTime: string;
  score: number;
  tickets: number;
  avatar: string;
}

export interface TicketComment {
  id: string;
  sender: 'customer' | 'agent' | 'system';
  author: string;
  text: string;
  time: string;
  type?: 'public' | 'internal';
}

export interface TicketAttachment {
  name: string;
  size: string;
  type: string;
}

export interface TicketActivity {
  id: string;
  type: string;
  detail: string;
  time: string;
}

export interface Ticket {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  channel: string;
  assignee: string;
  createdAt: string;
  updatedAt: string;
  slaHours: number;
  resolutionHours: number;
  tags: string[];
  summary: string;
  description: string;
  linkedIssues: string[];
  comments: TicketComment[];
  notes: string[];
  activities: TicketActivity[];
  attachments: TicketAttachment[];
  relatedTickets: string[];
}

export interface MetricSummary {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'neutral';
  detail: string;
}

export interface OverviewStat {
  openTickets: number;
  pending: number;
  resolvedToday: number;
  averageResponseTime: string;
}

export interface ChartPoint {
  name: string;
  tickets: number;
  resolved: number;
}

export interface AnalyticsMetric {
  name: string;
  value: number;
  change: number;
}
