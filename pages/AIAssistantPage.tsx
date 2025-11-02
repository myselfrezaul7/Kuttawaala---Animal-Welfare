import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { getVetAssistantResponse } from '../services/geminiService';
import { PawIcon, SendIcon } from '../components/icons';

const AIAssistantPage: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: ChatMessage = { sender: 'user', text: userInput };
    const updatedChatHistory = [...chatHistory, newUserMessage];
    setChatHistory(updatedChatHistory);
    setUserInput('');
    setIsLoading(true);

    try {
      const aiResponseText = await getVetAssistantResponse(updatedChatHistory);
      const newAiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
      setChatHistory(prev => [...prev, newAiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { 
        sender: 'ai', 
        text: "I'm having trouble connecting to my knowledge base. Please check your connection and try again.",
        isError: true 
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = async () => {
    // History before the error message was added
    const historyToRetry = chatHistory.filter(m => !m.isError);
    // Remove the error message from the UI and re-send the request
    setChatHistory(historyToRetry);
    setIsLoading(true);

    try {
      const aiResponseText = await getVetAssistantResponse(historyToRetry);
      const newAiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
      setChatHistory(prev => [...prev, newAiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { 
        sender: 'ai', 
        text: "I'm having trouble connecting to my knowledge base. Please check your connection and try again.",
        isError: true 
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] container mx-auto p-4 max-w-3xl">
      <div className="text-center mb-6 pt-4">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">AI Vet Assistant</h1>
        <p className="text-lg text-slate-800 dark:text-slate-200">Ask general questions about pet health and care.</p>
      </div>
      <div className="flex-grow bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl shadow-xl flex flex-col overflow-hidden">
        <div className="flex-grow p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="bg-orange-500 p-2 rounded-full text-white flex-shrink-0">
                  <PawIcon className="w-6 h-6" />
              </div>
              <div className="bg-white/30 dark:bg-slate-900/40 p-4 rounded-xl rounded-tl-none max-w-lg">
                <p className="text-slate-900 dark:text-slate-100">Hello! I'm KUTTAWAALA's AI Assistant. How can I help you with your pet today?</p>
              </div>
            </div>

            {chatHistory.map((message, index) => {
              if (message.isError) {
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-red-500 p-2 rounded-full text-white flex-shrink-0">
                      <PawIcon className="w-6 h-6" />
                    </div>
                    <div className="bg-red-500/20 backdrop-blur-md p-4 rounded-xl rounded-tl-none max-w-lg">
                      <p className="text-red-900 dark:text-red-100 font-medium">{message.text}</p>
                      <button 
                          onClick={handleRetry} 
                          className="mt-3 bg-red-500 text-white font-bold py-1.5 px-4 rounded-full text-sm hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-100 dark:focus:ring-offset-red-900/30 focus:ring-red-500 disabled:bg-red-300"
                          disabled={isLoading}
                      >
                          Retry
                      </button>
                    </div>
                  </div>
                )
              }
              return (
                <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                  {message.sender === 'ai' && (
                    <div className="bg-orange-500 p-2 rounded-full text-white flex-shrink-0">
                      <PawIcon className="w-6 h-6" />
                    </div>
                  )}
                  <div className={`p-4 rounded-xl max-w-lg whitespace-pre-wrap ${
                    message.sender === 'user' 
                    ? 'bg-orange-500 text-white rounded-br-none' 
                    : 'bg-white/30 dark:bg-slate-900/40 text-slate-900 dark:text-slate-100 rounded-tl-none'
                  }`}>
                    <p>{message.text}</p>
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="bg-orange-500 p-2 rounded-full text-white">
                  <PawIcon className="w-6 h-6" />
                </div>
                <div className="bg-white/30 dark:bg-slate-900/40 p-4 rounded-xl rounded-tl-none">
                  <div className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                    <div className="w-2 h-2 bg-slate-600 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-slate-600 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-slate-600 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
        <div className="p-4 bg-white/10 dark:bg-black/10 border-t border-white/30 dark:border-white/10">
          <form onSubmit={handleSubmit} className="flex items-center space-x-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask a question about pet care..."
              className="flex-grow p-3 bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 text-slate-900 dark:text-slate-50 placeholder:text-slate-600 dark:placeholder:text-slate-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white/30 dark:focus:bg-black/30 transition-colors"
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !userInput.trim()} className="bg-orange-500 text-white rounded-full p-3 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors">
              <SendIcon className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;