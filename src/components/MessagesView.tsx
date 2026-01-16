import React from 'react';
import { MessageCircle } from 'lucide-react';
import { mockMatches } from '../lib/mockData';

export function MessagesView() {
  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-primary-500">Messages</h2>
      </div>

      <div className="p-6">
        {mockMatches.slice(0, 2).map((match) => (
          <div
            key={match.id}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border-b border-gray-100 last:border-0"
          >
            <img
              src={match.avatar}
              alt={match.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{match.name}</h3>
              <p className="text-sm text-gray-500">Click to start conversation</p>
            </div>
            <MessageCircle className="w-5 h-5 text-gray-400" />
          </div>
        ))}
        {mockMatches.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No messages yet. Start connecting with professionals!</p>
          </div>
        )}
      </div>
    </div>
  );
}
