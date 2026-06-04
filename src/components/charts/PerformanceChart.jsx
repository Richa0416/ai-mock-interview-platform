import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const COLORS = ['#22d3ee', '#8b5cf6', '#34d399', '#f59e0b', '#f472b6'];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-panel rounded-lg border border-violet-500/20 px-3 py-2 text-sm">
      <p className="text-slate-200">{payload[0].payload.name}</p>
      <p className="text-cyan-400 font-semibold">{payload[0].value}%</p>
    </div>
  );
};

export default function PerformanceChart({ data, height = 260 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
        <YAxis
          type="category"
          dataKey="name"
          width={110}
          stroke="#64748b"
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.08)' }} />
        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
