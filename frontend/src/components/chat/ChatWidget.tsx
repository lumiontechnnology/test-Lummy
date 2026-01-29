import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Send } from 'lucide-react';
import { socketService } from '../../services/socketService';

export const ChatWidget: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (agentId) {
      socketService.connect(agentId);
      
      socketService.onMessage((data) => {
        setMessages((prev) => [...prev, { role: 'ai', content: data.message }]);
      });

      return () => {
        socketService.disconnect();
      };
    }
  }, [agentId]);

  const handleSend = () => {
    if (!input.trim() || !agentId) return;

    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    socketService.sendMessage(agentId, input);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#0047FF] to-[#0066FF] p-4">
          <h2 className="text-xl font-semibold text-white">Chat with Lummy</h2>
        </div>

        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#0047FF] to-[#0066FF] text-white'
                    : 'bg-white/10 text-gray-200'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 p-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-[#0047FF] to-[#0066FF] px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
