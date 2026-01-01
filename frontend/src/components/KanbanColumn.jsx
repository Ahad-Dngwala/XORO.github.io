import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const STATUS_COLORS = {
  TODO: {
    badge: 'badge-indigo',
    accent: 'border-l-indigo-500',
    bg: 'bg-indigo-50/30',
    darkBg: 'dark:bg-indigo-950/30',
    hoverBg: 'hover:bg-indigo-100/50 dark:hover:bg-indigo-900/50',
    text: 'text-indigo-700 dark:text-indigo-300',
    countBg: 'bg-indigo-100 dark:bg-indigo-900',
  },
  IN_PROGRESS: {
    badge: 'badge-amber',
    accent: 'border-l-amber-500',
    bg: 'bg-amber-50/30',
    darkBg: 'dark:bg-amber-950/30',
    hoverBg: 'hover:bg-amber-100/50 dark:hover:bg-amber-900/50',
    text: 'text-amber-700 dark:text-amber-300',
    countBg: 'bg-amber-100 dark:bg-amber-900',
  },
  DONE: {
    badge: 'badge-emerald',
    accent: 'border-l-emerald-500',
    bg: 'bg-emerald-50/30',
    darkBg: 'dark:bg-emerald-950/30',
    hoverBg: 'hover:bg-emerald-100/50 dark:hover:bg-emerald-900/50',
    text: 'text-emerald-700 dark:text-emerald-300',
    countBg: 'bg-emerald-100 dark:bg-emerald-900',
  },
};

const KanbanColumn = ({ id, title, tasks, onEdit, onDelete, status }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: 'column',
      status,
    },
  });

  const colors = STATUS_COLORS[status] || STATUS_COLORS.TODO;

  return (
    <div className="flex-1 min-w-[320px] max-w-[400px] transition-all duration-300">
      <div className="mb-5 px-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${colors.text.replace('text', 'bg')} animate-pulse`}></div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 tracking-tight">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className={`badge ${colors.badge} ${colors.countBg} font-semibold`}>
              {tasks.length}
            </span>
            {tasks.length > 0 && (
              <span className={`text-xs ${colors.text} font-medium`}>
                {tasks.length === 1 ? 'task' : 'tasks'}
              </span>
            )}
          </div>
        </div>
        <div className={`h-1 w-12 rounded-full ${colors.bg} ${colors.darkBg} transition-all duration-300`}></div>
      </div>
      
      <div
        ref={setNodeRef}
        className={`kanban-column ${isOver ? 'kanban-column-drag-over' : ''} ${colors.bg} ${colors.darkBg} ${colors.hoverBg} transition-all duration-300`}
      >
        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="mb-3 opacity-40">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="9" y1="12" x2="21" y2="12"></line>
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-400 mb-1">
              No tasks yet
            </p>
            <p className="text-xs text-slate-400/80">
              Drag tasks here or create a new one
            </p>
          </div>
        ) : (
          <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3 animate-in fade-in">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                  className="animate-in fade-in"
                >
                  <TaskCard
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </div>
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
