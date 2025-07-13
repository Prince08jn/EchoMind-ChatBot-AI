import React, { useState, useRef } from 'react';
import { Send, Square, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onStop?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, onStop }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '60px';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '60px';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text && !isLoading) {
        onSendMessage(`File "${file.name}" uploaded. Content:\n\n${text}`);
      }
    };

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (['txt', 'json', 'md'].includes(extension!)) {
      reader.readAsText(file);
    } else {
      alert('Only .txt, .json, or .md files are supported right now.');
    }

    e.target.value = ''; // reset file input
  };

  return (
    <div className="border-t border-brand-accent/30 bg-brand-dark/80 backdrop-blur-md p-6">
      <form onSubmit={handleSubmit} className="flex gap-4 items-end">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyDown={handleKeyPress}
            placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
            className="w-full bg-brand-light/80 border border-brand-accent/40 rounded-2xl px-6 py-4 pr-12 text-white placeholder-brand-accent/60 focus:border-brand-highlight focus:outline-none focus:ring-2 focus:ring-brand-highlight/30 transition-all resize-none animate-glow"
            style={{ minHeight: '60px', maxHeight: '200px' }}
            disabled={isLoading}
          />

          <div className="absolute right-3 bottom-3 flex gap-2">
            {!isLoading && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-brand-highlight hover:text-brand-accent hover:bg-brand-highlight/10 rounded-lg transition-all animate-pulse"
                title="Upload File"
              >
                <Paperclip size={18} />
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.json,.md"
              onChange={handleFileChange}
              className="hidden"
            />

            {isLoading && onStop && (
              <button
                type="button"
                onClick={onStop}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all animate-pulse"
                title="Stop generation"
              >
                <Square size={18} />
              </button>
            )}

            <button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="p-2 bg-gradient-to-r from-brand-highlight to-brand-accent hover:from-brand-accent hover:to-brand-highlight disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg shadow-brand-accent/25 disabled:shadow-none animate-glow"
              title="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </form>

      <div className="flex items-center justify-center mt-3">
        <div className="text-xs text-brand-accent/70 text-center">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-highlight rounded-full animate-ping"></div>
              AI is thinking...
            </span>
          ) : (
            'Enter to send • Shift+Enter for new line • 📎 to upload .txt/.json/.md'
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
