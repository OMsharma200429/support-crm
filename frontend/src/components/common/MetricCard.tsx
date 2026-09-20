import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'neutral';
  detail: string;
  icon: ReactNode;
}

export function MetricCard({ label, value, delta, trend, detail, icon }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="metric-card"
    >
      <div className="metric-header">
        <div>
          <p className="eyebrow">{label}</p>
          <h3>{value}</h3>
        </div>
        <div className="metric-icon">{icon}</div>
      </div>

      <div className="metric-footer">
        <span className={`metric-delta ${trend}`}>
          {trend === 'down' ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
          {delta}
        </span>
        <span>{detail}</span>
      </div>
    </motion.div>
  );
}
