import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CreateTicketModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: { title: string; customerName: string; priority: string; status: string; category: string }) => void;
}

const defaultValues = {
  title: '',
  customerName: 'Northstar Labs',
  priority: 'High',
  status: 'Open',
  category: 'Technical',
};

export function CreateTicketModal({ open, onClose, onSubmit }: CreateTicketModalProps) {
  const [form, setForm] = useState(defaultValues);

  useEffect(() => {
    if (open) {
      setForm(defaultValues);
    }
  }, [open]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.18 }}
          className="modal-panel"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="modal-header">
            <div>
              <p className="eyebrow">Create ticket</p>
              <h3>New support case</h3>
            </div>
            <button type="button" className="icon-button" onClick={onClose} aria-label="Close dialog">
              <X size={16} />
            </button>
          </div>

          <div className="modal-grid">
            <label>
              <span>Subject</span>
              <input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                placeholder="Issue summary"
              />
            </label>
            <label>
              <span>Customer</span>
              <input
                value={form.customerName}
                onChange={(event) => setForm({ ...form, customerName: event.target.value })}
              />
            </label>
            <label>
              <span>Priority</span>
              <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </label>
            <label>
              <span>Status</span>
              <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
                <option>Open</option>
                <option>Pending</option>
                <option>Resolved</option>
                <option>Escalated</option>
              </select>
            </label>
            <label className="full-span">
              <span>Category</span>
              <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
                <option>Technical</option>
                <option>Billing</option>
                <option>Account</option>
                <option>Product</option>
              </select>
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
            <button
              type="button"
              className="primary-button"
              onClick={() => {
                onSubmit(form);
                onClose();
              }}
            >
              Create ticket
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
