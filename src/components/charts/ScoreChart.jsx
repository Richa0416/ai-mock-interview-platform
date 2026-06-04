import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-panel rounded-lg border border-violet-500/20 px-3 py-2 text-sm shadow-xl">
      <p className="font-medium text-slate-200">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="text-xs mt-0.5">
          {entry.name}: {entry.value}%
        </p>
      ))}
    </div>
  );
};

export default function ScoreChart({ data, height = 280 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        <XAxis
          dataKey="week"
          stroke="#64748b"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[50, 100]}
          stroke="#64748b"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="score"
          name="Overall"
          stroke="#22d3ee"
          strokeWidth={2}
          fill="url(#scoreGradient)"
        />
        <Area
          type="monotone"
          dataKey="technical"
          name="Technical"
          stroke="#8b5cf6"
          strokeWidth={1.5}
          fill="transparent"
          strokeDasharray="4 4"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
