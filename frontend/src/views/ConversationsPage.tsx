import React, { useEffect, useState } from 'react';
import { MessageSquare, Search, CheckCircle, Clock, AlertCircle, Eye } from 'lucide-react';
import api from '../services/api';
 

interface Conversation {
  id: string;
  customerName?: string;
  customerEmail?: string;
  status: 'ACTIVE' | 'RESOLVED' | 'ESCALATED';
  channel: 'EMAIL' | 'CHAT' | 'PHONE' | 'SLACK';
  createdAt: string;
  updatedAt: string;
  messages: Array<{
    id: string;
    content: string;
    senderType: 'CUSTOMER' | 'AI' | 'HUMAN';
    createdAt: string;
  }>;
}

export const ConversationsPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const agentsRes = await api.get('/agents');
      const firstAgent = agentsRes.data?.[0];
      if (!firstAgent) {
        setConversations([]);
        return;
      }

      const convRes = await api.get(`/conversations/agent/${firstAgent.id}`);
      const items: Conversation[] = (convRes.data?.conversations || []).map((c: any) => ({
        id: c.id,
        customerName: c.customerName,
        customerEmail: c.customerEmail,
        status: c.status,
        channel: c.channel,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        messages: c.messages || [],
      }));
      setConversations(items);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectConversation = async (conv: Conversation) => {
    try {
      setSelectedConversation(conv);
      const res = await api.get(`/conversations/${conv.id}`);
      const full = res.data?.conversation;
      if (full) {
        setSelectedConversation({
          id: full.id,
          customerName: full.customerName,
          customerEmail: full.customerEmail,
          status: full.status,
          channel: full.channel,
          createdAt: full.createdAt,
          updatedAt: full.updatedAt,
          messages: full.messages || [],
        });
      }
    } catch (error) {
      console.error('Failed to load conversation:', error);
    }
  };

  const updateStatus = async (status: 'ACTIVE' | 'RESOLVED' | 'ESCALATED') => {
    if (!selectedConversation) return;
    try {
      const res = await api.patch(`/conversations/${selectedConversation.id}/status`, { status });
      const updated = res.data?.conversation;
      if (updated) {
        setSelectedConversation((prev) => prev ? { ...prev, status: updated.status, updatedAt: updated.updatedAt } : prev);
        setConversations((list) => list.map((c) => c.id === updated.id ? { ...c, status: updated.status, updatedAt: updated.updatedAt } : c));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = 
      conv.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || conv.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'RESOLVED':
        return <CheckCircle className="text-green-400" size={18} />;
      case 'ACTIVE':
        return <Clock className="text-blue-400" size={18} />;
      case 'ESCALATED':
        return <AlertCircle className="text-red-400" size={18} />;
      default:
        return <MessageSquare className="text-gray-400" size={18} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RESOLVED':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'ACTIVE':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'ESCALATED':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex gap-6">
      <div className="w-96 flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Conversations</h1>
          <p className="text-gray-400">View and manage customer conversations</p>
        </div>

        <div className="mb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex gap-2">
            {['ALL', 'ACTIVE', 'RESOLVED', 'ESCALATED'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  statusFilter === status
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {loading ? (
            <div className="text-center text-gray-400 py-8">Loading conversations...</div>
          ) : filteredConversations.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <MessageSquare className="mx-auto mb-2 opacity-50" size={48} />
              <p>No conversations found</p>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => selectConversation(conv)}
                className={`bg-white/5 border border-white/10 rounded-lg p-4 cursor-pointer transition-all hover:bg-white/10 ${
                  selectedConversation?.id === conv.id ? 'border-primary bg-white/10' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(conv.status)}
                    <div>
                      <div className="font-semibold text-white">
                        {conv.customerName || 'Anonymous'}
                      </div>
                      <div className="text-xs text-gray-400">{conv.customerEmail}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded border ${getStatusColor(conv.status)}`}>
                    {conv.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                  {conv.messages[conv.messages.length - 1]?.content}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="bg-white/5 px-2 py-1 rounded">{conv.channel}</span>
                  <span>{new Date(conv.updatedAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl flex flex-col">
        {selectedConversation ? (
          <>
            <div className="border-b border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedConversation.customerName || 'Anonymous'}
                  </h2>
                  <p className="text-gray-400">{selectedConversation.customerEmail}</p>
                </div>
                <span className={`px-4 py-2 rounded-lg border ${getStatusColor(selectedConversation.status)}`}>
                  {selectedConversation.status}
                </span>
              </div>
              
              <div className="flex gap-4 text-sm">
                <div className="bg-white/5 px-3 py-2 rounded-lg">
                  <span className="text-gray-400">Channel:</span>{' '}
                  <span className="text-white font-medium">{selectedConversation.channel}</span>
                </div>
                <div className="bg-white/5 px-3 py-2 rounded-lg">
                  <span className="text-gray-400">Started:</span>{' '}
                  <span className="text-white font-medium">
                    {new Date(selectedConversation.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {selectedConversation.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderType === 'CUSTOMER' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-2xl px-4 py-3 rounded-lg ${
                      msg.senderType === 'CUSTOMER'
                        ? 'bg-gradient-to-r from-[#0047FF] to-[#0066FF] text-white'
                        : msg.senderType === 'AI'
                        ? 'bg-white/10 text-gray-200'
                        : 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold opacity-75">
                        {msg.senderType === 'CUSTOMER' ? 'Customer' : msg.senderType === 'AI' ? 'Lummy AI' : 'Human Agent'}
                      </span>
                      <span className="text-xs opacity-50">
                        {new Date(msg.createdAt).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="flex gap-3">
                {selectedConversation.status === 'ACTIVE' && (
                  <>
                    <button onClick={() => updateStatus('RESOLVED')} className="flex-1 bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg font-semibold hover:bg-green-500/30 transition-all">
                      Mark as Resolved
                    </button>
                    <button onClick={() => updateStatus('ESCALATED')} className="flex-1 bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg font-semibold hover:bg-red-500/30 transition-all">
                      Escalate to Human
                    </button>
                  </>
                )}
                {selectedConversation.status === 'RESOLVED' && (
                  <button onClick={() => updateStatus('ACTIVE')} className="flex-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 px-4 py-3 rounded-lg font-semibold hover:bg-blue-500/30 transition-all">
                    Reopen Conversation
                  </button>
                )}
                {selectedConversation.status === 'ESCALATED' && (
                  <div className="flex-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-4 py-3 rounded-lg text-center">
                    <strong>Escalated:</strong> Human agent assigned
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <Eye className="mx-auto mb-4 opacity-50" size={64} />
              <p className="text-lg">Select a conversation to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationsPage;
