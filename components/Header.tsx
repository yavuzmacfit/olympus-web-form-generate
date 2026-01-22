
import React from 'react';
import { Menu, User, Lightbulb } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  openAssistant: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, openAssistant }) => {
  return (
    <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* PM Idea Assistant Shortcut */}
        <button 
          onClick={openAssistant}
          className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-100 transition-colors"
        >
          <Lightbulb size={18} />
          <span className="hidden sm:inline">Idea Assistant</span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">Olympus SuperUser</p>
            <p className="text-xs text-gray-500">Olympus Super User</p>
          </div>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
            <User size={24} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
