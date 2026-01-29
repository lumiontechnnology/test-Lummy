import React, { useEffect, useState } from 'react';
import { TrendingUp, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Overview: React.FC = () => {
  const [stats] = useState({
    totalConversations: 47,
    resolvedConversations: 42,
    avgResponseTime: 2.3,
    learningProgress: 78,
  });

  const chartData = [
    { day: 'Mon', conversations: 12 },
    { day: 'Tue', conversations: 19 },
    { day: 'Wed', conversations: 24 },
    { day: 'Thu', conversations: 31 },
    { day: 'Fri', conversations: 28 },
    { day: 'Sat', conversations: 15 },
    { day: 'Sun', conversations: 10 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Overview</h1>
        <p className="text-gray-400 mt-1">Track your AI agent's performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={<MessageSquare />}
          label="Total Conversations"
          value={stats.totalConversations.toString()}
          trend="+12%"
        />
        <StatCard
          icon={<CheckCircle />}
          label="Resolved"
          value={stats.resolvedConversations.toString()}
          trend="+8%"
        />
        <StatCard
          icon={<Clock />}
          label="Avg Response Time"
          value={`${stats.avgResponseTime}s`}
          trend="-15%"
        />
        <StatCard
          icon={<TrendingUp />}
          label="Learning Progress"
          value={`${stats.learningProgress}%`}
          trend="+5%"
        />
      </div>

      {/* Chart */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Conversation Volume</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="conversations"
              stroke="#0047FF"
              strokeWidth={2}
              dot={{ fill: '#0047FF', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
}> = ({ icon, label, value, trend }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="text-gray-400">{icon}</div>
      <span className="text-green-400 text-sm font-medium">{trend}</span>
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
);

