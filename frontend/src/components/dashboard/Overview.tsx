import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, MessageSquare, Clock, CheckCircle, 
  Users, Zap, ArrowUp, ArrowDown, RefreshCw, Download 
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../../services/api';

export const Overview: React.FC = () => {
  const [stats, setStats] = useState({
    totalConversations: 156,
    resolvedConversations: 142,
    activeConversations: 14,
    avgResponseTime: 2.3,
    learningProgress: 78,
    customerSatisfaction: 4.6,
    escalationRate: 5.1,
  });

  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');

  const conversationData = [
    { day: 'Mon', conversations: 18, resolved: 16, escalated: 2 },
    { day: 'Tue', conversations: 24, resolved: 21, escalated: 3 },
    { day: 'Wed', conversations: 32, resolved: 29, escalated: 3 },
    { day: 'Thu', conversations: 28, resolved: 25, escalated: 3 },
    { day: 'Fri', conversations: 35, resolved: 33, escalated: 2 },
    { day: 'Sat', conversations: 12, resolved: 11, escalated: 1 },
    { day: 'Sun', conversations: 7, resolved: 7, escalated: 0 },
  ];

  const channelData = [
    { name: 'Chat', value: 65, color: '#0047FF' },
    { name: 'Email', value: 25, color: '#0066FF' },
    { name: 'Phone', value: 8, color: '#667EEA' },
    { name: 'Slack', value: 2, color: '#764BA2' },
  ];

  const responseTimeData = [
    { hour: '00:00', time: 2.1 },
    { hour: '04:00', time: 1.8 },
    { hour: '08:00', time: 2.5 },
    { hour: '12:00', time: 3.2 },
    { hour: '16:00', time: 2.8 },
    { hour: '20:00', time: 2.4 },
  ];

  const loadStats = async () => {
    setLoading(true);
    try {
      // API call would go here
      // For now using demo data
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, [timeRange]);

  const exportReport = () => {
    alert('Exporting report... This will download a PDF with all analytics.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Overview</h1>
          <p className="text-gray-400">Track your AI agent's performance and insights</p>
        </div>
        
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          
          <button
            onClick={loadStats}
            disabled={loading}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white hover:bg-white/10 transition-all disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
          
          <button
            onClick={exportReport}
            className="bg-gradient-to-r from-[#0047FF] to-[#0066FF] rounded-lg px-4 py-2 text-white hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center gap-2"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          icon={<MessageSquare />}
          label="Total Conversations"
          value={stats.totalConversations.toString()}
          change="+12.5%"
          positive={true}
        />
        <MetricCard
          icon={<CheckCircle />}
          label="Resolution Rate"
          value={`${Math.round((stats.resolvedConversations / stats.totalConversations) * 100)}%`}
          change="+3.2%"
          positive={true}
        />
        <MetricCard
          icon={<Clock />}
          label="Avg Response Time"
          value={`${stats.avgResponseTime}s`}
          change="-0.8s"
          positive={true}
        />
        <MetricCard
          icon={<TrendingUp />}
          label="Learning Progress"
          value={`${stats.learningProgress}%`}
          change="+5%"
          positive={true}
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <Users className="text-green-400" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.customerSatisfaction}/5.0</div>
              <div className="text-sm text-gray-400">Customer Satisfaction</div>
            </div>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={`h-2 flex-1 rounded ${
                  star <= Math.round(stats.customerSatisfaction) ? 'bg-green-400' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-500/20 p-2 rounded-lg">
              <Zap className="text-yellow-400" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.escalationRate}%</div>
              <div className="text-sm text-gray-400">Escalation Rate</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {stats.totalConversations - stats.resolvedConversations} conversations escalated
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <MessageSquare className="text-blue-400" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.activeConversations}</div>
              <div className="text-sm text-gray-400">Active Now</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Being handled by AI agent
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Conversation Volume */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Conversation Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={conversationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="conversations"
                stroke="#0047FF"
                strokeWidth={3}
                dot={{ fill: '#0047FF', r: 5 }}
                name="Total"
              />
              <Line
                type="monotone"
                dataKey="resolved"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: '#10B981', r: 4 }}
                name="Resolved"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Channel Distribution */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Channel Distribution</h3>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-3 flex-1">
              {channelData.map((channel) => (
                <div key={channel.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: channel.color }}
                    />
                    <span className="text-gray-300">{channel.name}</span>
                  </div>
                  <span className="text-white font-semibold">{channel.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Response Time Trends */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Response Time by Hour</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="hour" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="time" fill="#0047FF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Insights */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">AI Insights</h3>
          <div className="space-y-4">
            <InsightCard
              type="success"
              title="High Resolution Rate"
              description="91% of conversations resolved without escalation"
            />
            <InsightCard
              type="info"
              title="Learning Progress"
              description="Voice profile accuracy improved by 15% this week"
            />
            <InsightCard
              type="warning"
              title="Peak Hours Detected"
              description="Most activity between 12-4 PM. Consider adding capacity."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}> = ({ icon, label, value, change, positive }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="text-gray-400">{icon}</div>
      <span className={`text-sm font-medium flex items-center gap-1 ${
        positive ? 'text-green-400' : 'text-red-400'
      }`}>
        {positive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
        {change}
      </span>
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
);

const InsightCard: React.FC<{
  type: 'success' | 'info' | 'warning';
  title: string;
  description: string;
}> = ({ type, title, description }) => {
  const colors = {
    success: 'bg-green-500/10 border-green-500/20 text-green-400',
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  };

  return (
    <div className={`border rounded-lg p-4 ${colors[type]}`}>
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-sm opacity-80">{description}</div>
    </div>
  );
};
