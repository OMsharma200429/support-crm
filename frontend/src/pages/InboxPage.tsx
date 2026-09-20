import { Mail, Sparkles } from 'lucide-react';

const inboxItems = [
  {
    from: 'Alyssa Grant',
    subject: 'Enterprise billing follow-up',
    time: '2 min ago',
    unread: true,
  },
  {
    from: 'Rahul Sharma',
    subject: 'Login issue update',
    time: '14 min ago',
    unread: true,
  },
  {
    from: 'System',
    subject: 'Escalation queue summary',
    time: '32 min ago',
    unread: false,
  },
  {
    from: 'Jordan Lee',
    subject: 'Onboarding dashboard review',
    time: '1 hour ago',
    unread: false,
  },
];

export function InboxPage() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Inbox</p>
          <h1>Team messages</h1>
        </div>
      </div>

      <section className="panel table-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Messages</p>
            <h2>Recent activity</h2>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>Subject</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {inboxItems.map((item) => (
                <tr key={`${item.from}-${item.subject}`}>
                  <td>
                    <div className="ticket-cell">
                      <strong>{item.from}</strong>
                      {item.unread && <span className="tag-pill">New</span>}
                    </div>
                  </td>
                  <td>{item.subject}</td>
                  <td>
                    <div className="meta-inline">
                      <Mail size={14} />
                      <span>{item.time}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="floating-cta">
        <div>
          <p className="eyebrow">Live</p>
          <strong>Support inbox is synced with customer updates</strong>
        </div>
        <div className="meta-inline">
          <Sparkles size={15} />
          <span>2 unread</span>
        </div>
      </div>
    </div>
  );
}
