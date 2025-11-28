import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ChatMessage } from '../types';
import { getVetAssistantResponseStream } from '../services/geminiService';
import { PawIcon, SendIcon, CloseIcon, WarningIcon, TrashIcon } from '../components/icons';
import { useCookieConsent } from '../contexts/CookieConsentContext';
import { useLanguage } from '../contexts/LanguageContext';

const CHAT_HISTORY_STORAGE_KEY = 'kuttawaala_ai_chat_history';

const AIAssistantPage: React.FC = () => {
  const { hasConsent } = useCookieConsent();
  const { t, language } = useLanguage();

  const getInitialChatHistory = useCallback((): ChatMessage[] => {
    if (hasConsent('functional')) {
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
            try {
                window.localStorage.removeItem(CHAT_HISTORY_STORAGE_KEY);
            } catch (removeError) {
                console.error("Failed to remove corrupted chat history:", removeError);
            }
        }
    }
    return [];
  }, [hasConsent]);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(getInitialChatHistory);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const FULL_DISCLAIMER_TEXT = language === 'bn' 
    ? `***দাবিত্যাগ: আমি একজন AI Vet এবং পেশাদার ভেটেরিনারি পরামর্শের বিকল্প নই। এই তথ্য শুধুমাত্র সাধারণ নির্দেশনা এবং প্রাথমিক চিকিৎসার উদ্দেশ্যে। যেকোনো স্বাস্থ্য উদ্বেগ বা জরুরি অবস্থার জন্য সর্বদা একজন লাইসেন্সপ্রাপ্ত, ব্যক্তিগত পশুচিকিৎসকের সাথে পরামর্শ করুন।***`
    : `***Disclaimer: I am an AI Vet and not a substitute for professional veterinary advice. This information is for general guidance and first-aid purposes only. ALWAYS consult a licensed, in-person veterinarian for any health concerns or emergencies.***`;

  useEffect(() => {
    if (hasConsent('functional')) {
        try {
            window.localStorage.setItem(CHAT_HISTORY_STORAGE_KEY, JSON.stringify(chatHistory));
        } catch (error) {
            console.error("Error writing chat history to localStorage:", error);
        }
    }
  }, [chatHistory, hasConsent]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  useEffect(() => {
    try {
        const warningDismissed = sessionStorage.getItem('kuttawaala_ai_warning_dismissed');
        if (warningDismissed !== 'true') {
            setIsWarningVisible(true);
        }
    } catch (error) {
        console.error("Could not read from sessionStorage", error);
        setIsWarningVisible(true); // Show warning if sessionStorage is blocked
    }
  }, []);

  const handleDismissWarning = useCallback(() => {
    setIsWarningVisible(false);
    try {
      sessionStorage.setItem('kuttawaala_ai_warning_dismissed', 'true');
    } catch (error) {
      console.error("Could not write to sessionStorage", error);
    }
  }, []);

  const handleSendMessage = useCallback(async (messageText: string, isRetry = false) => {
    if (!messageText.trim() || isLoading) return;

    let historyForApi = chatHistory;
    
    if (!isRetry) {
        const newUserMessage: ChatMessage = { sender: 'user', text: messageText };
        historyForApi = [...chatHistory, newUserMessage];
        setChatHistory(historyForApi);
        setUserInput('');
    } else {
        // For retry, we assume the last message in chatHistory (which was error) is removed by the caller of this logic
        historyForApi = chatHistory; 
    }

    setIsLoading(true);

    try {
      // Add a placeholder message for the AI response
      const placeholderMessage: ChatMessage = { sender: 'ai', text: '' };
      setChatHistory(prev => [...prev, placeholderMessage]);

      const stream = getVetAssistantResponseStream(historyForApi, language);
      
      let fullResponse = "";

      for await (const chunk of stream) {
        if (chunk) {
            fullResponse += chunk;
            setChatHistory(prev => {
                const newHistory = [...prev];
                // Update the last message (which is our placeholder)
                const lastIdx = newHistory.length - 1;
                newHistory[lastIdx] = { ...newHistory[lastIdx], text: fullResponse };
                return newHistory;
            });
        }
      }
    } catch (error) {
       // Remove the placeholder and add error
       setChatHistory(prev => {
           const newHistory = prev.slice(0, -1); // remove placeholder
           return [...newHistory, { sender: 'ai', text: t('generic.error.api'), isError: true }];
       });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, chatHistory, language, t]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(userInput);
  }, [handleSendMessage, userInput]);

  const handleRetry = useCallback(async () => {
    const historyToRetry = chatHistory.filter(m => !m.isError);
    // We update state to remove error message before retrying
    setChatHistory(historyToRetry);
    
    // We need to re-send the request based on the history. 
    // The last message in historyToRetry should be the user's message.
    if (historyToRetry.length > 0 && historyToRetry[historyToRetry.length - 1].sender === 'user') {
       // We pass the history manually, but we don't need to re-add the user message to state, just trigger API
       // Ideally refactoring handleSendMessage to accept history would be cleaner, but for now:
       
       setIsLoading(true);
       try {
          const placeholderMessage: ChatMessage = { sender: 'ai', text: '' };
          setChatHistory(prev => [...prev, placeholderMessage]);

          const stream = getVetAssistantResponseStream(historyToRetry, language);
          let fullResponse = "";

          for await (const chunk of stream) {
            if (chunk) {
                fullResponse += chunk;
                setChatHistory(prev => {
                    const newHistory = [...prev];
                    const lastIdx = newHistory.length - 1;
                    newHistory[lastIdx] = { ...newHistory[lastIdx], text: fullResponse };
                    return newHistory;
                });
            }
          }
       } catch(error) {
            setChatHistory(prev => {
                const newHistory = prev.slice(0, -1);
                return [...newHistory, { sender: 'ai', text: t('generic.error.api'), isError: true }];
            });
       } finally {
           setIsLoading(false);
       }
    }
  }, [chatHistory, language, t]);
  
  const handleClearChat = useCallback(() => {
    if (window.confirm(t('aiAssistantPage.clearChat.confirm'))) {
      setChatHistory([]);
    }
  }, [t]);

  return (
    <div className="flex flex-col flex-grow container mx-auto p-4 sm:p-6 max-w-4xl">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">{t('aiAssistantPage.title')} <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full align-middle ml-2">PRO</span></h1>
        <p className="text-lg text-slate-800 dark:text-slate-200">{t('aiAssistantPage.subtitle')}</p>
        {isWarningVisible && (
          <div className="relative mt-4 max-w-2xl mx-auto bg-red-500/10 border border-red-500/30 text-red-900 dark:text-red-200 px-4 py-3 rounded-lg text-sm transition-opacity duration-300" role="alert">
            <button
              onClick={handleDismissWarning}
              className="absolute top-1.5 right-1.5 p-1.5 rounded-full text-red-800/70 dark:text-red-200/70 hover:bg-red-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label={t('aiAssistantPage.warning.dismiss')}
            >
              <CloseIcon className="w-4 h-4" />
            </button>
            <p className="font-bold pr-4 sm:pr-8">{t('aiAssistantPage.warning.title')}</p>
            <p className="mt-1 pr-4 sm:pr-8">{t('aiAssistantPage.warning.subtitle')}</p>
          </div>
        )}
      </div>
      <div className="flex-grow bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/30 dark:border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-white/30 dark:border-slate-700 flex-shrink-0">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">{t('aiAssistantPage.conversation')}</h2>
          <button
              onClick={handleClearChat}
              disabled={chatHistory.length === 0}
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label={t('aiAssistantPage.clearChat.button')}
          >
              <TrashIcon className="w-4 h-4" />
              {t('aiAssistantPage.clearChat.button')}
          </button>
        </div>
        <div className="flex-grow p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="bg-orange-500 p-2 rounded-full text-white flex-shrink-0">
                  <PawIcon className="w-6 h-6" />
              </div>
              <div className="bg-white/60 dark:bg-slate-900/60 p-4 rounded-xl rounded-tl-none max-w-lg">
                <p className="text-slate-900 dark:text-slate-100">{t('aiAssistantPage.initialGreeting')}</p>
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
                          {t('aiAssistantPage.retry')}
                      </button>
                    </div>
                  </div>
                )
              }
              
              if (message.sender === 'ai' && message.text.startsWith(FULL_DISCLAIMER_TEXT)) {
                    const restOfMessage = message.text.substring(FULL_DISCLAIMER_TEXT.length).trim();
                    
                    return (
                        <div key={index} className="flex items-start gap-3 animate-fadeIn">
                            <div className="bg-orange-500 p-2 rounded-full text-white flex-shrink-0">
                                <PawIcon className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col gap-3 max-w-full md:max-w-lg w-full">
                                <div className="bg-amber-500/20 backdrop-blur-sm border border-amber-500/40 p-4 rounded-xl flex items-start gap-3">
                                    <WarningIcon className="w-8 h-8 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                                    <div className="text-amber-900 dark:text-amber-100 text-sm">
                                        <p className="font-bold">{t('aiAssistantPage.disclaimer.title')}</p>
                                        <p>{t('aiAssistantPage.disclaimer.body')}</p>
                                    </div>
                                </div>
                                {restOfMessage && (
                                    <div className="bg-white/60 dark:bg-slate-900/60 p-4 rounded-xl rounded-tl-none self-start">
                                        <p className="text-slate-900 dark:text-slate-100 whitespace-pre-wrap">{restOfMessage}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                }

              return (
                <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : 'animate-fadeIn'}`}>
                  {message.sender === 'ai' && (
                    <div className="bg-orange-500 p-2 rounded-full text-white flex-shrink-0">
                      <PawIcon className="w-6 h-6" />
                    </div>
                  )}
                  <div className={`p-4 rounded-xl max-w-full md:max-w-lg whitespace-pre-wrap ${
                    message.sender === 'user' 
                    ? 'bg-orange-500 text-white rounded-br-none' 
                    : 'bg-white/60 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 rounded-tl-none'
                  }`}>
                    {/* Render empty div if text is empty to show box, or spinner if it's the very first chunk appearing */}
                    {message.text ? <p>{message.text}</p> : <div className="flex space-x-1 h-6 items-center"><div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div><div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div><div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div></div>}
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>
        </div>
        <div className="p-4 bg-white/20 dark:bg-slate-900/20 border-t border-white/30 dark:border-slate-700">
          <form onSubmit={handleSubmit} className="flex items-center space-x-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={t('aiAssistantPage.input.placeholder')}
              className="flex-grow p-3 bg-white/50 dark:bg-slate-900/50 border border-white/30 dark:border-slate-700 text-slate-900 dark:text-slate-50 placeholder:text-slate-600 dark:placeholder:text-slate-300 rounded-full focus:ring-2 focus:ring-orange-500/80 focus:border-orange-500 focus:bg-white/70 dark:focus:bg-slate-900/70 transition-colors"
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