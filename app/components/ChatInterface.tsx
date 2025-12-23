'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Loader2, BookOpen, Lightbulb, Target, Wand2 } from 'lucide-react';
import { useStore } from '../store';
import MessageBubble from './MessageBubble';

type ConversationMode = 'story' | 'feedback' | 'goals' | 'whatif';

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [mode, setMode] = useState<ConversationMode>('story');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, addMessage, currentGenre } = useStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    addMessage({ role: 'user', content: userMessage });
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage },
          ],
          genre: currentGenre,
          mode,
        }),
      });

      const data = await response.json();

      if (data.message) {
        addMessage({ role: 'assistant', content: data.message });
      }
    } catch (error) {
      console.error('Chat error:', error);
      addMessage({
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (messages.length === 0 || imageLoading) return;

    setImageLoading(true);

    try {
      const lastMessages = messages.slice(-3);
      const context = lastMessages.map((m) => m.content).join(' ');
      const prompt = `Based on this story: ${context.slice(0, 500)}. Create a scene illustration.`;

      const response = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, genre: currentGenre }),
      });

      const data = await response.json();

      if (data.imageUrl) {
        addMessage({
          role: 'assistant',
          content: 'Here\'s a visual representation of your story:',
          imageUrl: data.imageUrl,
        });
      }
    } catch (error) {
      console.error('Image generation error:', error);
      addMessage({
        role: 'assistant',
        content: 'Sorry, I couldn\'t generate an image. Please try again.',
      });
    } finally {
      setImageLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const modes = [
    { value: 'story' as const, label: 'Story', icon: BookOpen, description: 'Interactive storytelling' },
    { value: 'feedback' as const, label: 'Feedback', icon: Lightbulb, description: 'Creative critique' },
    { value: 'goals' as const, label: 'Goals', icon: Target, description: 'Set challenges' },
    { value: 'whatif' as const, label: 'What-If', icon: Wand2, description: 'Genre switch' },
  ];

  const starterPrompts = {
    story: [
      'Start a story about a reluctant hero',
      'I discover a mysterious door in my attic',
      'Write about two rivals who must work together',
    ],
    feedback: [
      'Review this opening chapter...',
      'How can I improve my dialogue?',
      'Is my pacing too slow?',
    ],
    goals: [
      'Help me set a writing goal for this week',
      'I want to finish a short story in 7 days',
      'Suggest daily writing challenges',
    ],
    whatif: [
      'Reimagine my fantasy story as a thriller',
      'Turn this romance into a sci-fi adventure',
      'What if my detective story was a comedy?',
    ],
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Mode Selector */}
      <div className="glass-effect border-b border-white/10 p-3">
        <div className="max-w-4xl mx-auto flex items-center space-x-2">
          <span className="text-sm text-gray-400 mr-2">Mode:</span>
          {modes.map((m) => (
            <button
              key={m.value}
              onClick={() => setMode(m.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === m.value
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
              title={m.description}
            >
              <m.icon className="w-4 h-4" />
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-6">
                <h2 className="text-2xl font-bold gradient-text mb-2">
                  {mode === 'story' && 'Begin Your Story'}
                  {mode === 'feedback' && 'Get Creative Feedback'}
                  {mode === 'goals' && 'Set Your Goals'}
                  {mode === 'whatif' && 'Reimagine Your Story'}
                </h2>
                <p className="text-gray-400">
                  {mode === 'story' && 'Start with a prompt or choose one below'}
                  {mode === 'feedback' && 'Share your writing for constructive critique'}
                  {mode === 'goals' && 'Let\'s create a plan to achieve your creative vision'}
                  {mode === 'whatif' && 'Transform your story into a different genre'}
                </p>
              </div>

              <div className="grid gap-3 max-w-2xl mx-auto">
                {starterPrompts[mode].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(prompt)}
                    className="p-4 glass-effect rounded-xl text-left hover:bg-white/10 transition-all group"
                  >
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                      {prompt}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {loading && (
            <div className="flex justify-center">
              <div className="glass-effect px-6 py-3 rounded-full flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Creating...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="glass-effect border-t border-white/10 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <button
              onClick={handleGenerateImage}
              disabled={imageLoading || messages.length === 0}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Generate scene image"
            >
              {imageLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ImageIcon className="w-5 h-5" />
              )}
            </button>

            <div className="flex-1 bg-white/5 rounded-xl border border-white/10 focus-within:border-purple-500/50 transition-colors">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  mode === 'story'
                    ? 'Start your story or make a choice...'
                    : mode === 'feedback'
                    ? 'Share your writing for feedback...'
                    : mode === 'goals'
                    ? 'Describe your creative goals...'
                    : 'Describe your story to reimagine...'
                }
                rows={3}
                className="w-full bg-transparent p-4 resize-none focus:outline-none"
              />
            </div>

            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>{input.length} characters</span>
          </div>
        </div>
      </div>
    </div>
  );
}
