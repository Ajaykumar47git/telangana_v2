import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, RotateCcw, FileText, ArrowUpRight, Compass } from 'lucide-react';
import { ChatMessage } from '../../types/heritage';
import { MOCK_AI_RESPONSES } from '../../data/heritageData';
import { Button } from '../ui/button';
import { useHeritage } from '../../context/HeritageContext';

interface AIChatProps {
  initialPrompt?: string;
  isCompact?: boolean;
  className?: string;
}

export const AIChat: React.FC<AIChatProps> = ({ initialPrompt, isCompact = false, className = '' }) => {
  const { navigate } = useHeritage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Namaste! I am your SanghaTelangana Heritage Guide. I can share scholarly insights on ancient Buddhist monasteries, Brahmi inscriptions, architectural features, and help plan your exploration across Telangana.',
      timestamp: 'Just now',
      suggestedQuestions: [
        'What is Phanigiri famous for?',
        'What was a Buddhist vihara?',
        'Which sites belong to the Satavahana period?',
        'Show inscriptions from Phanigiri',
        'Plan a Buddhist heritage trip'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState(initialPrompt || '');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI inference with realistic knowledge response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let matchedResponse = MOCK_AI_RESPONSES[lower];

      if (!matchedResponse) {
        // Partial key matching
        const key = Object.keys(MOCK_AI_RESPONSES).find((k) => lower.includes(k) || k.includes(lower));
        if (key) {
          matchedResponse = MOCK_AI_RESPONSES[key];
        }
      }

      if (!matchedResponse) {
        matchedResponse = {
          text: `Based on the Archaeological Survey of India (ASI) records and Telangana State Heritage archives, ${text} relates to the vibrant Buddhist culture that flourished along the Krishna and Godavari river basins between 300 BCE and 400 CE. Monasteries like Phanigiri, Dhulikatta, and Nelakondapalli served as vital monastic and artistic hubs during this period.`,
          sources: [
            { title: 'Telangana Heritage Department Archaeological Records', type: 'Scholar Paper' },
            { title: 'Buddhist Stupas of the Deccan', type: 'ASI Inscription' }
          ],
          suggestions: [
            'What is Phanigiri famous for?',
            'Which sites belong to the Satavahana period?',
            'Plan a Buddhist heritage trip'
          ]
        };
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: matchedResponse.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: matchedResponse.sources,
        suggestedQuestions: matchedResponse.suggestions
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: 'Chat history cleared. How can I assist with your study of Telangana’s Buddhist heritage?',
        timestamp: 'Just now',
        suggestedQuestions: [
          'What is Phanigiri famous for?',
          'Which sites belong to the Satavahana period?',
          'Plan a Buddhist heritage trip'
        ]
      }
    ]);
  };

  return (
    <div
      className={`flex flex-col bg-[#191B20] border border-[#2E333D] overflow-hidden ${
        isCompact ? 'h-[460px]' : 'h-[620px] sm:h-[700px]'
      } ${className}`}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#121316] border-b border-[#2E333D]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#B89255]/20 border border-[#B89255] flex items-center justify-center text-[#B89255]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-sm sm:text-base font-semibold text-[#FAF8F3]">
              AI Heritage Guide
            </h3>
            <p className="text-[10px] text-[#9E9689]">
              Trained on Epigraphical & Archaeological Corpora
            </p>
          </div>
        </div>

        <button
          onClick={handleClear}
          className="flex items-center gap-1 text-xs text-[#9E9689] hover:text-[#FAF8F3] px-2.5 py-1 border border-[#2E333D] hover:bg-[#22262E] transition-colors cursor-pointer"
          title="Clear Conversation"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[90%] sm:max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                msg.sender === 'user'
                  ? 'bg-[#B89255] text-[#0D0E10]'
                  : 'bg-[#22262E] text-[#B89255] border border-[#B89255]/40'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            {/* Bubble */}
            <div className="space-y-2">
              <div
                className={`p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed border ${
                  msg.sender === 'user'
                    ? 'bg-[#B89255]/15 border-[#B89255]/40 text-[#FAF8F3]'
                    : 'bg-[#121316] border-[#2E333D] text-[#EADBCA]'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
                <div className="text-[9px] text-[#9E9689] text-right mt-1.5">{msg.timestamp}</div>
              </div>

              {/* Source Cards if present */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="p-2.5 bg-[#121316]/60 border border-[#2E333D]/60 space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#B89255] font-medium block">
                    Archaeological Sources:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.sources.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => src.siteSlug && navigate(`/sites/${src.siteSlug}`)}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-[#191B20] hover:bg-[#22262E] border border-[#2E333D] text-[10px] text-[#D5C5AE] transition-colors cursor-pointer"
                      >
                        <FileText className="w-3 h-3 text-[#B89255]" />
                        <span>{src.title}</span>
                        {src.siteSlug && <ArrowUpRight className="w-2.5 h-2.5 text-[#9E9689]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Questions */}
              {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                <div className="pt-2">
                  <p className="text-[10px] text-[#9E9689] uppercase tracking-wider mb-1.5">
                    Related Inquiries:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q)}
                        className="text-[11px] px-2.5 py-1 bg-[#22262E] hover:bg-[#B89255]/20 hover:border-[#B89255] text-[#EADBCA] hover:text-[#FAF8F3] border border-[#2E333D] transition-colors text-left cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 mr-auto">
            <div className="w-7 h-7 rounded-full bg-[#22262E] text-[#B89255] border border-[#B89255]/40 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-[#121316] border border-[#2E333D] p-3 text-xs text-[#9E9689] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89255] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89255] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89255] animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-[11px]">Consulting digital epigraphy corpus...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 sm:p-4 bg-[#121316] border-t border-[#2E333D] flex items-center gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about Buddhist sites, Brahmi scripts, artifacts, or itineraries..."
          className="flex-1 bg-[#191B20] text-[#FAF8F3] placeholder:text-[#9E9689] px-4 py-2.5 text-xs sm:text-sm border border-[#2E333D] focus:outline-none focus:border-[#B89255]"
        />
        <Button
          type="submit"
          variant="gold"
          disabled={!inputValue.trim() || isTyping}
          className="h-10 px-4 shrink-0"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline ml-1.5 text-xs">Send</span>
        </Button>
      </form>
    </div>
  );
};
