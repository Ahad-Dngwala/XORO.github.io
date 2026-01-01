import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      onEdit(task.id, {
        title: editedTitle.trim(),
        description: editedDescription.trim() || null,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || '');
    setIsEditing(false);
  };

  // Keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') handleCancel();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (isEditing) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="task-card bg-indigo-50/50 border-indigo-200"
      >
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full mb-3 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-medium dark:text-white transition-all"
          placeholder="Task title"
          autoFocus
          onKeyDown={handleKeyDown}
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full mb-3 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm dark:text-white transition-all"
          placeholder="Description (optional)"
          rows="3"
          onKeyDown={handleKeyDown}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="btn-primary text-xs px-4 py-1.5"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="btn-secondary text-xs px-4 py-1.5"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`task-card group ${isDragging ? 'task-card-dragging' : ''} border-l-4 border-l-indigo-500 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] dark:shadow-slate-900/50`}
    >
      <div className="flex justify-between items-start gap-3 mb-2">
        <h3
          className="font-semibold text-slate-900 dark:text-white flex-1 cursor-text text-[15px] leading-snug hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          onClick={() => setIsEditing(true)}
        >
          {task.title}
        </h3>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 rounded-md transition-all duration-200 transform hover:scale-110"
            title="Edit task (Enter to save, Esc to cancel)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('Are you sure you want to delete this task?')) {
                onDelete(task.id);
              }
            }}
            className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-md transition-all duration-200 transform hover:scale-110"
            title="Delete task"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed whitespace-pre-wrap line-clamp-3">
          {task.description}
        </p>
      )}
      
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          {formatDate(task.createdAt)}
        </span>
        {task.updatedAt !== task.createdAt && (
          <span className="text-xs text-slate-400 dark:text-slate-500 italic">
            Updated {formatDate(task.updatedAt)}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
