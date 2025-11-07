
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PerformanceData } from '../types';

interface PerformanceChartProps {
  data: PerformanceData[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
        <XAxis dataKey="month" tick={{ fill: '#9ca3af' }} fontSize={12} />
        <YAxis tick={{ fill: '#9ca3af' }} fontSize={12} domain={['dataMin - 5', 'dataMax + 5']}/>
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(31, 41, 55, 0.8)', // bg-gray-800 with opacity
            borderColor: '#4b5563', // border-gray-600
            color: '#ffffff',
            borderRadius: '0.5rem',
          }}
          labelStyle={{ color: '#d1d5db' }} // text-gray-300
        />
        <Legend wrapperStyle={{fontSize: '14px'}}/>
        <Line type="monotone" dataKey="nav" name="NAV" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} dot={{r: 4}} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;
