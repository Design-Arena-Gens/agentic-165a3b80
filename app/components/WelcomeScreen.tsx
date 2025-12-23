'use client';

import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Lightbulb, Target, Wand2 } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Storytelling',
      description: 'Embark on choose-your-own-adventure narratives with dynamic plot twists',
    },
    {
      icon: Lightbulb,
      title: 'Creative Feedback',
      description: 'Get expert critique on plot, characters, dialogue, and pacing',
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Set micro-goals and daily challenges to stay accountable',
    },
    {
      icon: Wand2,
      title: 'Genre Switching',
      description: 'Reimagine your story in different genres with "what-if" scenarios',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Creative Mentor AI</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your Personal Storytelling Companion & Creative Coach
          </p>

          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all"
          >
            Begin Your Creative Journey
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="p-6 glass-effect rounded-xl story-card"
            >
              <feature.icon className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-purple-200">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center text-gray-400 text-sm"
        >
          <p>
            Choose a genre from the header, then start a conversation to begin crafting your story
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
