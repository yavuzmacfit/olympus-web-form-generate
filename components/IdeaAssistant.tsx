import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, MessageSquare, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface IdeaAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const IdeaAssistant: React.FC<IdeaAssistantProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      /* Correct: Initialize client right before usage to ensure current API Key access */
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        /* Correct: Using gemini-3-pro-preview for advanced product reasoning/consulting task */
        model: 'gemini-3-pro-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are a Senior Product Consultant for Olympus, a gym/club management admin portal. 
          Your goal is to help Product Managers mature their feature ideas. 
          The portal handles membership registration (Aday Üye), campaign management, payments, and role-based permissions.
          Provide feedback on technical feasibility, user experience, and potential business impact for the gym industry.
          Keep responses professional, structured, and insightful.`,
        }
      });

      /* Correct: Accessing .text property directly, not as a method */
      const aiResponse = response.text || "I'm sorry, I couldn't generate a response right now.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "An error occurred while thinking. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-blue-600 text-white">
          <div className="flex items-center gap-2">
            <Sparkles size={20} />
            <h2 className="font-bold text-lg">PM Idea Assistant</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-blue-700 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4" ref={scrollRef}>
          {messages.length === 0 && (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600">
                <MessageSquare size={32} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Ready to brainstorm?</h3>
                <p className="text-sm text-gray-500 mt-1 px-8">
                  Describe a feature you're considering for Olympus. For example: "I want to add a gamified referral system for members."
                </p>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200 shadow-sm whitespace-pre-wrap'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl flex items-center gap-3">
                <Loader2 className="animate-spin text-blue-500" size={18} />
                <span className="text-sm text-gray-500">Olympus Assistant is thinking...</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-100">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What's your feature idea?"
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <button 
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
          <p className="text-[10px] text-gray-400 mt-3 text-center">
            Powered by Olympus AI • Expert insights for Product Managers
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdeaAssistant;