// src/components/Sidebar.tsx
import React from 'react';
import { Plus, History } from 'lucide-react';

interface SidebarProps {
  history: { id: string; title: string; timestamp: number }[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ history, activeId, onSelect, onNewChat }) => {
  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 p-4 flex flex-col text-white font-inter">
      <h2 className="text-lg font-sora font-bold mb-4 text-brand-accent flex items-center gap-2">
        <History size={20} /> Chat History
      </h2>

      <button
        onClick={onNewChat}
        className="mb-4 flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg px-4 py-2 transition-all"
      >
        <Plus size={18} className="mr-2" /> New Chat
      </button>

      <div className="flex-1 overflow-y-auto space-y-2">
        {history.length === 0 ? (
          <p className="text-sm text-gray-400">No previous chats</p>
        ) : (
          history.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                activeId === item.id
                  ? 'bg-cyan-600 text-white'
                  : 'hover:bg-gray-800 text-gray-300'
              }`}
            >
              {item.title || `Chat on ${new Date(item.timestamp).toLocaleString()}`}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
