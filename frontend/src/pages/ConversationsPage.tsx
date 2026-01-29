import React from 'react';

export const ConversationsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Conversations</h1>
      <p className="text-gray-400 mt-2">View all customer conversations here</p>
      
      <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-8">
        <p className="text-gray-400 text-center">No conversations yet. Start engaging with customers!</p>
      </div>
    </div>
  );
};
