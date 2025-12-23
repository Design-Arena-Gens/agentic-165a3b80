'use client';

import { useState } from 'react';
import { BookOpen, Target, Folder, ChevronLeft, ChevronRight, Plus, Trash2, CheckCircle, Circle } from 'lucide-react';
import { useStore } from '../store';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'goals'>('projects');
  const { projects, goals, addProject, deleteProject, addGoal, toggleGoal, deleteGoal, currentGenre } = useStore();

  const handleAddProject = () => {
    const title = prompt('Project title:');
    if (title) {
      addProject({
        title,
        genre: currentGenre,
        description: '',
        chapters: [],
      });
    }
  };

  const handleAddGoal = () => {
    const title = prompt('Goal title:');
    if (title) {
      const description = prompt('Goal description (optional):') || '';
      addGoal({
        title,
        description,
        completed: false,
      });
    }
  };

  if (collapsed) {
    return (
      <div className="w-16 glass-effect border-r border-white/10 flex flex-col items-center py-4 space-y-4">
        <button
          onClick={() => setCollapsed(false)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <BookOpen className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Target className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-80 glass-effect border-r border-white/10 flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'projects' ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-white/5'
            }`}
          >
            <Folder className="w-4 h-4" />
            <span className="text-sm font-medium">Projects</span>
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'goals' ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-white/5'
            }`}
          >
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Goals</span>
          </button>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'projects' ? (
          <div className="space-y-3">
            <button
              onClick={handleAddProject}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">New Project</span>
            </button>

            {projects.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">
                <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No projects yet</p>
                <p className="text-xs mt-1">Create your first project!</p>
              </div>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm mb-1">{project.title}</h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <span className="capitalize">{project.genre}</span>
                        <span>•</span>
                        <span>{project.chapters.length} chapters</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this project?')) {
                          deleteProject(project.id);
                        }
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleAddGoal}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">New Goal</span>
            </button>

            {goals.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">
                <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No goals yet</p>
                <p className="text-xs mt-1">Set your first creative goal!</p>
              </div>
            ) : (
              goals.map((goal) => (
                <div
                  key={goal.id}
                  className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => toggleGoal(goal.id)}
                      className="mt-0.5 flex-shrink-0"
                    >
                      {goal.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h3
                        className={`font-medium text-sm mb-1 ${
                          goal.completed ? 'line-through text-gray-500' : ''
                        }`}
                      >
                        {goal.title}
                      </h3>
                      {goal.description && (
                        <p className="text-xs text-gray-400">{goal.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this goal?')) {
                          deleteGoal(goal.id);
                        }
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="text-xs text-gray-400 space-y-1">
          <div className="flex items-center justify-between">
            <span>Projects</span>
            <span className="font-medium text-purple-400">{projects.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Active Goals</span>
            <span className="font-medium text-purple-400">
              {goals.filter((g) => !g.completed).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
