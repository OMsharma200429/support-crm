import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { analyticsMetrics, chartSeries } from '../data/seedData';

const volumeColors = ['#8b5cf6', '#a78bfa', '#c4b5fd'];

export function AnalyticsPage() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Analytics</p>
          <h1>Support performance</h1>
        </div>
      </div>

      <div className="metrics-grid narrow-grid">
        {analyticsMetrics.map((metric) => (
          <div className="metric-card analytics-metric" key={metric.name}>
            <div className="metric-header">
              <p className="eyebrow">{metric.name}</p>
              <h3>{metric.value}{metric.name === 'Ticket throughput' || metric.name === 'Resolved within SLA' ? '%' : metric.name === 'CSAT' ? '/5' : 'h'}</h3>
            </div>
            <div className="metric-footer">
              <span className={`metric-delta ${metric.change > 0 ? 'up' : 'down'}`}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="content-grid two-col">
        <section className="panel chart-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Volume</p>
              <h2>Ticket volume</h2>
            </div>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="tickets" radius={[6, 6, 0, 0]} fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel chart-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Efficiency</p>
              <h2>Resolution trend</h2>
            </div>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="resolved" radius={[6, 6, 0, 0]} fill="#a78bfa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="content-grid two-col">
        <section className="panel chart-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Response</p>
              <h2>Response time</h2>
            </div>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={[{ name: 'Under SLA', value: 82 }, { name: 'At risk', value: 18 }]} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80}>
                  {volumeColors.map((color, index) => (
                    <Cell key={color + index} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel chart-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Agents</p>
              <h2>Agent performance</h2>
            </div>
          </div>
          <div className="agent-list">
            {['Ava Ross', 'Leo Martin', 'Sana Patel', 'Noah Chen'].map((name, index) => (
              <div key={name} className="agent-row">
                <div className="agent-name">
                  <span className="mini-avatar">{name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>
                  <div>
                    <strong>{name}</strong>
                    <small>{index === 0 ? '96%' : index === 1 ? '91%' : index === 2 ? '94%' : '88%'}</small>
                  </div>
                </div>
                <div className="progress-strip"><span style={{ width: `${92 - index * 4}%` }} /></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
