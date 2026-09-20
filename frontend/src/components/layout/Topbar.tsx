import { Bell, Command, HelpCircle, Search, Plus } from 'lucide-react';

interface TopbarProps {
  onOpenSearch: () => void;
  onCreateTicket: () => void;
  onOpenSearchResults?: () => void;
}

export function Topbar({ onOpenSearch, onCreateTicket }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="search-trigger" onClick={onOpenSearch} role="button" tabIndex={0} onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          onOpenSearch();
        }
      }}>
        <Search size={16} />
        <span>Search tickets, customers, commands</span>
        <div className="shortcut-badge">
          <Command size={12} />
          K
        </div>
      </div>

      <div className="topbar-actions">
        <button type="button" className="icon-button" aria-label="Notifications">
          <Bell size={17} />
        </button>
        <button type="button" className="icon-button" aria-label="Help">
          <HelpCircle size={17} />
        </button>
        <button type="button" className="primary-button compact" onClick={onCreateTicket}>
          <Plus size={15} />
          New ticket
        </button>
        <div className="user-pill">
          <div className="mini-avatar">AS</div>
          <div>
            <strong>Ash Scott</strong>
            <small>Team lead</small>
          </div>
        </div>
      </div>
    </header>
  );
}
