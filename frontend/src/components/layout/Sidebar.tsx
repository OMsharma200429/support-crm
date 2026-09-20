import { Bell, BriefcaseBusiness, CircleHelp, FolderKanban, LayoutGrid, MessageSquareText, Settings, Ticket, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const items = [
  { label: 'Overview', to: '/', icon: LayoutGrid },
  { label: 'Tickets', to: '/tickets', icon: Ticket },
  { label: 'Customers', to: '/customers', icon: Users },
  { label: 'Analytics', to: '/analytics', icon: BriefcaseBusiness },
  { label: 'Inbox', to: '/inbox', icon: MessageSquareText },
  { label: 'My Tickets', to: '/tickets?scope=My+Tickets', icon: FolderKanban },
  { label: 'Unassigned', to: '/tickets?scope=Unassigned', icon: FolderKanban },
  { label: 'Urgent', to: '/tickets?scope=Urgent', icon: Bell },
  { label: 'Notifications', to: '/notifications', icon: Bell },
  { label: 'Settings', to: '/settings', icon: Settings },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-top">
        <div className="brand-mark">
          <span className="brand-dot" />
          {!collapsed && <span className="brand-name">SupportCRM</span>}
        </div>
        <button type="button" className="sidebar-toggle" onClick={onToggle} aria-label="Toggle sidebar">
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="nav-list" aria-label="Primary">
        {items.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            title={collapsed ? label : undefined}
          >
            <Icon size={18} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button type="button" className="nav-item muted" title={collapsed ? 'Help' : undefined}>
          <CircleHelp size={18} />
          {!collapsed && <span>Help</span>}
        </button>
        <div className="profile-card">
          <div className="avatar">AS</div>
          {!collapsed && (
            <div className="profile-meta">
              <strong>Ash Scott</strong>
              <span>Operations</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
