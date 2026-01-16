import React from 'react';
import { MapPin, Award, MessageCircle } from 'lucide-react';
import { mockMatches } from '../lib/mockData';

export function ConnectionsView() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-primary-500 mb-2">Your Network</h2>
        <p className="text-gray-600">Manage your professional connections</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockMatches.map((connection) => (
          <div key={connection.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-24 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
            <div className="relative px-6 pb-6">
              <img
                src={connection.avatar}
                alt={connection.name}
                className="w-20 h-20 rounded-full border-4 border-white -mt-10 mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{connection.name}</h3>
              <p className="text-primary-600 font-medium capitalize mb-3">{connection.role}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{connection.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Award className="w-4 h-4" />
                  <span>{connection.experience}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {connection.goals.slice(0, 2).map((goal, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium"
                  >
                    {goal}
                  </span>
                ))}
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold">
                <MessageCircle className="w-4 h-4" />
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
