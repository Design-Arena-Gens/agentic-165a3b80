import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Genre = 'fantasy' | 'scifi' | 'romance' | 'thriller' | 'comedy' | 'horror' | 'mystery' | 'adventure';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  choices?: string[];
  imageUrl?: string;
  timestamp: number;
}

export interface Project {
  id: string;
  title: string;
  genre: Genre;
  description: string;
  chapters: Chapter[];
  createdAt: number;
  updatedAt: number;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  createdAt: number;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: number;
  createdAt: number;
}

interface StoreState {
  messages: Message[];
  currentGenre: Genre;
  projects: Project[];
  goals: Goal[];
  currentProjectId: string | null;

  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  setGenre: (genre: Genre) => void;

  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (id: string | null) => void;

  addChapterToProject: (projectId: string, chapter: Omit<Chapter, 'id' | 'createdAt'>) => void;

  addGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => void;
  toggleGoal: (id: string) => void;
  deleteGoal: (id: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      messages: [],
      currentGenre: 'fantasy',
      projects: [],
      goals: [],
      currentProjectId: null,

      addMessage: (message) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: Math.random().toString(36).substr(2, 9),
              timestamp: Date.now(),
            },
          ],
        })),

      clearMessages: () => set({ messages: [] }),

      setGenre: (genre) => set({ currentGenre: genre }),

      addProject: (project) =>
        set((state) => ({
          projects: [
            ...state.projects,
            {
              ...project,
              id: Math.random().toString(36).substr(2, 9),
              createdAt: Date.now(),
              updatedAt: Date.now(),
            },
          ],
        })),

      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: Date.now() } : p
          ),
        })),

      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          currentProjectId: state.currentProjectId === id ? null : state.currentProjectId,
        })),

      setCurrentProject: (id) => set({ currentProjectId: id }),

      addChapterToProject: (projectId, chapter) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  chapters: [
                    ...p.chapters,
                    {
                      ...chapter,
                      id: Math.random().toString(36).substr(2, 9),
                      createdAt: Date.now(),
                    },
                  ],
                  updatedAt: Date.now(),
                }
              : p
          ),
        })),

      addGoal: (goal) =>
        set((state) => ({
          goals: [
            ...state.goals,
            {
              ...goal,
              id: Math.random().toString(36).substr(2, 9),
              createdAt: Date.now(),
            },
          ],
        })),

      toggleGoal: (id) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, completed: !g.completed } : g
          ),
        })),

      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        })),
    }),
    {
      name: 'creative-mentor-storage',
    }
  )
);
