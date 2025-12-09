import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Stats } from '../types';

interface StatsRadarProps {
  stats: Stats;
}

const StatsRadar = ({ stats }: StatsRadarProps) => {
  const data = [
    { subject: 'STR', A: stats.str, fullMark: 50 },
    { subject: 'AGI', A: stats.agi, fullMark: 50 },
    { subject: 'INT', A: stats.int, fullMark: 50 },
    { subject: 'WIS', A: stats.wis, fullMark: 50 },
  ];

  return (
    <div className="w-full relative" style={{ height: 250 }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#00f0ff', fontSize: 12, fontFamily: 'Courier Prime' }} />
          <PolarRadiusAxis angle={30} domain={[0, 50]} tick={false} axisLine={false} />
          <Radar
            name="Player"
            dataKey="A"
            stroke="#00f0ff"
            strokeWidth={2}
            fill="#00f0ff"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-20" />
    </div>
  );
};

export default StatsRadar;