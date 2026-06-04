import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export default function RadarSkillChart({ data, height = 280 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid stroke="#334155" />
        <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 11 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#22d3ee"
          fill="#22d3ee"
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            background: '#11141f',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '8px',
          }}
          labelStyle={{ color: '#e2e8f0' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
