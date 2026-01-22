
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import IdeaAssistant from './components/IdeaAssistant';
import WebFormCreation from './components/WebFormCreation';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
          <Header 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            openAssistant={() => setIsAssistantOpen(true)}
          />

          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/web-form-olusturma" element={<WebFormCreation />} />
            </Routes>
          </main>
        </div>

        {/* AI Idea Assistant Drawer */}
        <IdeaAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
        
        {/* Floating Support Icon (as seen in screenshot) */}
        <button className="fixed bottom-6 left-6 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-blue-500 hover:bg-gray-50 transition-colors z-40">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-headset"><path d="M3 11a9 9 0 0 1 18 0v4.5A2.5 2.5 0 0 1 18.5 18H18a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/><path d="M21 11a9 9 0 0 0-18 0v4.5A2.5 2.5 0 0 0 5.5 18H6a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3"/><path d="M12 20v2"/><path d="M9 20h6"/></svg>
        </button>
      </div>
    </Router>
  );
};

export default App;
