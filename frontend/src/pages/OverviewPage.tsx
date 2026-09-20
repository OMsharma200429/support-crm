import { motion } from 'framer-motion';
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowRight, BarChart3, CheckCircle2, Clock3, MessageSquareText, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MetricCard } from '../components/common/MetricCard';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { StatusBadge } from '../components/common/StatusBadge';
import { chartSeries, overviewMetrics } from '../data/seedData';
import type { Ticket } from '../types/crm';

const chartColors = ['#8b5cf6', '#a78bfa', '#ddd6fe'];

interface OverviewPageProps {
  tickets: Ticket[];
  onCreateTicket: () => void;
}

export function OverviewPage({ tickets, onCreateTicket }: OverviewPageProps) {
  const recentTickets = tickets.slice(0, 5);

  const statusSummary = [
    { name: 'Open', value: tickets.filter((ticket) => ticket.status === 'Open').length },
    { name: 'Pending', value: tickets.filter((ticket) => ticket.status === 'Pending').length },
    { name: 'Resolved', value: tickets.filter((ticket) => ticket.status === 'Resolved').length },
    { name: 'Escalated', value: tickets.filter((ticket) => ticket.status === 'Escalated').length },
  ];

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Good morning, Ash</h1>
        </div>
        <div className="page-actions">
          <button type="button" className="secondary-button" onClick={() => {}}>View reports</button>
          <button type="button" className="primary-button" onClick={onCreateTicket}>
            <Plus size={15} />
            Create ticket
          </button>
        </div>
      </div>

      <section className="status-strip panel">
        <div className="team-status">
          <div className="team-avatars">
            <span>AR</span>
            <span>LM</span>
            <span>SP</span>
            <span>+4</span>
          </div>
          <div>
            <strong>Team status</strong>
            <small>4 agents online</small>
          </div>
        </div>
        <div className="status-tile">
          <span className="signal healthy" />
          Healthy queue
        </div>
        <div className="status-tile">
          <span className="signal warning" />
          2 escalations
        </div>
      </section>

      <div className="metrics-grid">
        <MetricCard
          label="Open tickets"
          value={String(overviewMetrics.openTickets)}
          delta="+12%"
          trend="up"
          detail="vs last week"
          icon={<MessageSquareText size={18} />}
        />
        <MetricCard
          label="Pending"
          value={String(overviewMetrics.pending)}
          delta="-8%"
          trend="down"
          detail="response queue"
          icon={<Clock3 size={18} />}
        />
        <MetricCard
          label="Resolved today"
          value={String(overviewMetrics.resolvedToday)}
          delta="+5%"
          trend="up"
          detail="within SLA"
          icon={<CheckCircle2 size={18} />}
        />
        <MetricCard
          label="Average response"
          value={overviewMetrics.averageResponseTime}
          delta="-14m"
          trend="down"
          detail="faster than usual"
          icon={<BarChart3 size={18} />}
        />
      </div>

      <div className="content-grid two-col">
        <section className="panel chart-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Volume</p>
              <h2>Ticket volume over time</h2>
            </div>
            <button className="text-button" type="button">Export</button>
          </div>

          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartSeries}>
                <defs>
                  <linearGradient id="ticketFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.38} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="tickets" stroke="#8b5cf6" strokeWidth={2} fill="url(#ticketFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel chart-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Status</p>
              <h2>Status distribution</h2>
            </div>
          </div>

          <div className="pie-wrap">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={statusSummary} dataKey="value" nameKey="name" innerRadius={52} outerRadius={74} paddingAngle={3}>
                  {statusSummary.map((entry, index) => (
                    <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="legend-list">
              {statusSummary.map((entry, index) => (
                <div className="legend-item" key={entry.name}>
                  <span className="legend-swatch" style={{ background: chartColors[index % chartColors.length] }} />
                  <span>{entry.name}</span>
                  <strong>{entry.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="panel table-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Queue</p>
            <h2>Recent tickets</h2>
          </div>
          <Link to="/tickets" className="text-button" aria-label="See all tickets">See all</Link>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Customer</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {recentTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <div className="ticket-cell">
                      <strong>{ticket.id}</strong>
                      <span>{ticket.title}</span>
                    </div>
                  </td>
                  <td>{ticket.customerName}</td>
                  <td><PriorityBadge priority={ticket.priority} /></td>
                  <td><StatusBadge status={ticket.status} /></td>
                  <td>{new Date(ticket.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <motion.div className="floating-cta" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <p className="eyebrow">Today</p>
          <strong>Customer sentiment is trending up</strong>
        </div>
        <button type="button" className="primary-button" onClick={onCreateTicket}>
          <ArrowRight size={15} />
          Create ticket
        </button>
      </motion.div>
    </div>
  );
}
