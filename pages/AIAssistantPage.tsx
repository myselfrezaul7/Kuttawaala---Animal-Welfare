import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { getVetAssistantResponse } from '../services/geminiService';
import { PawIcon, SendIcon, CloseIcon, WarningIcon } from '../components/icons';

const CHAT_HISTORY_STORAGE_KEY = 'kuttawaala_ai_chat_history';
const FULL_DISCLAIMER_TEXT = `***Disclaimer: I am an AI Vet and not a substitute for professional veterinary advice. This information is for general guidance and first-aid purposes only. ALWAYS consult a licensed, in-person veterinarian for any health concerns or emergencies.***`;


const getInitialChatHistory = (): ChatMessage[] => {
  try {
    const storedHistory = window.localStorage.getItem(CHAT_HISTORY_STORAGE_KEY);
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      if (Array.isArray(parsedHistory)) {
        return parsedHistory;
      }
    }
  } catch (error) {
    console.error("Error reading chat history from localStorage:", error);
    // Attempt to remove corrupted data
    try {
        window.localStorage.removeItem(CHAT_HISTORY_STORAGE_KEY);
    } catch (removeError) {
        console.error("Failed to remove corrupted chat history:", removeError);
    }
  }
  return [];
};

const AIAssistantPage: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(getInitialChatHistory);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(CHAT_HISTORY_STORAGE_KEY, JSON.stringify(chatHistory));
    } catch (error) {
      console.error("Error writing chat history to localStorage:", error);
    }
  }, [chatHistory]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  useEffect(() => {
    try {
        // Show warning only if it hasn't been dismissed in the current session
        const warningDismissed = sessionStorage.getItem('kuttawaala_ai_warning_dismissed');
        if (warningDismissed !== 'true') {
            setIsWarningVisible(true);
        }
    } catch (error) {
        console.error("Could not read from sessionStorage", error);
        // Default to showing the warning if sessionStorage is not available
        setIsWarningVisible(true);
    }
  }, []);

  const handleDismissWarning = () => {
    setIsWarningVisible(false);
    try {
      sessionStorage.setItem('kuttawaala_ai_warning_dismissed', 'true');
    } catch (error) {
      console.error("Could not write to sessionStorage", error);
    }
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const newUserMessage: ChatMessage = { sender: 'user', text: messageText };
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
        text: "I'm sorry, but an error occurred while processing your request. Please check your internet connection and try again.",
        isError: true 
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(userInput);
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
        text: "I'm sorry, but an error occurred while processing your request. Please check your internet connection and try again.",
        isError: true 
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] container mx-auto p-4 sm:p-6 max-w-4xl">
      <div className="text-center mb-6 pt-4">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">AI Vet</h1>
        <p className="text-lg text-slate-800 dark:text-slate-200">Get general guidance and first-aid information for your pet.</p>
        {isWarningVisible && (
          <div className="relative mt-4 max-w-2xl mx-auto bg-red-500/10 border border-red-500/30 text-red-900 dark:text-red-200 px-4 py-3 rounded-lg text-sm transition-opacity duration-300" role="alert">
            <button
              onClick={handleDismissWarning}
              className="absolute top-1.5 right-1.5 p-1.5 rounded-full text-red-800/70 dark:text-red-200/70 hover:bg-red-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Dismiss warning"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
            <p className="font-bold pr-8">IMPORTANT: This is not a substitute for professional veterinary advice.</p>
            <p className="mt-1 pr-8">This AI is for informational and first-aid purposes only. For any medical emergency or health concern, please consult a licensed, in-person veterinarian immediately.</p>
          </div>
        )}
      </div>
      <div className="flex-grow bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-2xl shadow-xl flex flex-col overflow-hidden">
        <div className="flex-grow p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="bg-orange-500 p-2 rounded-full text-white flex-shrink-0">
                  <PawIcon className="w-6 h-6" />
              </div>
              <div className="bg-white/30 dark:bg-slate-900/40 p-4 rounded-xl rounded-tl-none max-w-lg">
                <p className="text-slate-900 dark:text-slate-100">Hello! I'm KUTTAWAALA's AI Vet. I can provide general guidance and first-aid information. How can I help you today?</p>
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
              
              if (message.sender === 'ai' && message.text.startsWith(FULL_DISCLAIMER_TEXT)) {
                    const restOfMessage = message.text.substring(FULL_DISCLAIMER_TEXT.length).trim();
                    const disclaimerBody = `I am an AI Vet and not a substitute for professional veterinary advice. This information is for general guidance and first-aid purposes only. ALWAYS consult a licensed, in-person veterinarian for any health concerns or emergencies.`;

                    return (
                        <div key={index} className="flex items-start gap-3">
                            <div className="bg-orange-500 p-2 rounded-full text-white flex-shrink-0">
                                <PawIcon className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col gap-3 max-w-full md:max-w-lg w-full">
                                <div className="bg-amber-500/20 border border-amber-500/40 p-4 rounded-xl flex items-start gap-3">
                                    <WarningIcon className="w-8 h-8 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                                    <div className="text-amber-900 dark:text-amber-100 text-sm">
                                        <p className="font-bold">Disclaimer</p>
                                        <p>{disclaimerBody}</p>
                                    </div>
                                </div>
                                {restOfMessage && (
                                    <div className="bg-white/30 dark:bg-slate-900/40 p-4 rounded-xl rounded-tl-none self-start">
                                        <p className="text-slate-900 dark:text-slate-100 whitespace-pre-wrap">{restOfMessage}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                }

              return (
                <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                  {message.sender === 'ai' && (
                    <div className="bg-orange-500 p-2 rounded-full text-white flex-shrink-0">
                      <PawIcon className="w-6 h-6" />
                    </div>
                  )}
                  <div className={`p-4 rounded-xl max-w-full md:max-w-lg whitespace-pre-wrap ${
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
