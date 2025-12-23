'use client';

import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';
import { Message } from '../store';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
    >
      <div className={`flex space-x-3 max-w-3xl ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'
          }`}
        >
          {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
        </div>

        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser ? 'bg-blue-500/20 border border-blue-500/30' : 'glass-effect'
          }`}
        >
          <div className="markdown-content">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>

          {message.imageUrl && (
            <div className="mt-3">
              <Image
                src={message.imageUrl}
                alt="Generated scene"
                width={512}
                height={512}
                className="rounded-lg w-full max-w-md"
                unoptimized
              />
            </div>
          )}

          {message.choices && message.choices.length > 0 && (
            <div className="mt-4 space-y-2">
              {message.choices.map((choice, i) => (
                <button
                  key={i}
                  className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-lg text-left text-sm transition-colors border border-white/10 hover:border-purple-500/50"
                >
                  <span className="font-medium text-purple-300 mr-2">{i + 1}.</span>
                  {choice}
                </button>
              ))}
            </div>
          )}

          <div className="text-xs text-gray-500 mt-2">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
