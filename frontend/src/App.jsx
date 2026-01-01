import { useState, useEffect } from 'react';
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import toast, { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import KanbanColumn from './components/KanbanColumn';
import AddTaskModal from './components/AddTaskModal';
import TaskCard from './components/TaskCard';
import SkeletonLoader from './components/SkeletonLoader';
import { taskService } from './services/api';

const STATUS_MAP = {
  TODO: 'Todo',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

const STATUS_ORDER = ['TODO', 'IN_PROGRESS', 'DONE'];

// Toast configuration
const toastOptions = {
  duration: 3000,
  position: 'top-right',
  style: {
    background: '#fff',
    color: '#334155',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    padding: '16px',
    fontSize: '14px',
  },
  success: {
    iconTheme: {
      primary: '#10b981',
      secondary: '#fff',
    },
  },
  error: {
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff',
    },
  },
};

// Keyboard shortcuts
const handleKeyboardShortcuts = (e) => {
  // Ctrl/Cmd + K for search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    // Trigger search focus
    const searchButton = document.querySelector('[title*="Search"]');
    searchButton?.click();
  }
  
  // Ctrl/Cmd + N for new task
  if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
    e.preventDefault();
    setIsModalOpen(true);
  }
  
  // Escape to close modal
  if (e.key === 'Escape' && isModalOpen) {
    setIsModalOpen(false);
  }
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fetch tasks on mount
  useEffect(() => {
    console.log('🔄 XORO: useEffect triggered, fetching tasks...');
    
    let isMounted = true;
    
    // Set a timeout to ensure app renders even if API hangs
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        console.warn('⚠️ XORO: API call taking too long, rendering anyway');
        setLoading(false);
        setTasks([]);
      }
    }, 5000); // 5 second timeout
    
    const loadTasks = async () => {
      await fetchTasks();
      if (isMounted) {
        clearTimeout(timeoutId);
      }
    };
    
    loadTasks();
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // Add keyboard shortcuts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardShortcuts);
    return () => window.removeEventListener('keydown', handleKeyboardShortcuts);
  }, [isModalOpen]);

  const fetchTasks = async () => {
    try {
      console.log('📡 XORO: Starting API call...');
      setLoading(true);
      const data = await taskService.getAllTasks();
      console.log('✅ XORO: API call successful, data:', data);
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('❌ XORO: Error fetching tasks:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to load tasks';
      toast.error(errorMessage, toastOptions);
      // Set empty array on error so app still renders
      setTasks([]);
    } finally {
      console.log('🏁 XORO: Setting loading to false');
      setLoading(false);
    }
  };

  // Filter and sort tasks
  const getFilteredAndSortedTasks = () => {
    let filteredTasks = tasks;
    
    // Filter by search query
    if (searchQuery.trim()) {
      filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Sort tasks
    if (sortOrder === 'date') {
      filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOrder === 'updated') {
      filteredTasks.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
    
    return filteredTasks;
  };

  const handleToggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = () => {
    const nextOrder = sortOrder === 'default' ? 'date' : sortOrder === 'date' ? 'updated' : 'default';
    setSortOrder(nextOrder);
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      toast.success('Task created successfully!', toastOptions);
    } catch (error) {
      console.error('Error creating task:', error);
      const message = error.response?.data?.error || error.response?.data?.details?.[0]?.message || 'Failed to create task';
      toast.error(message, toastOptions);
      throw error;
    }
  };

  const handleEditTask = async (id, taskData) => {
    try {
      const updatedTask = await taskService.updateTask(id, taskData);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      toast.success('Task updated successfully!', toastOptions);
    } catch (error) {
      console.error('Error updating task:', error);
      const message = error.response?.data?.error || error.response?.data?.details?.[0]?.message || 'Failed to update task';
      toast.error(message, toastOptions);
      throw error;
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success('Task deleted successfully!', toastOptions);
    } catch (error) {
      console.error('Error deleting task:', error);
      const message = error.response?.data?.error || 'Failed to delete task';
      toast.error(message, toastOptions);
    }
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find the tasks
    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    // Check if dropped on a column
    if (over.data.current?.type === 'column') {
      const newStatus = over.data.current.status;
      if (activeTask.status !== newStatus) {
        // Update status
        try {
          await handleEditTask(activeId, { status: newStatus });
        } catch (error) {
          // Error already handled in handleEditTask
        }
      }
      return;
    }

    // Check if dropped on another task
    const overTask = tasks.find((t) => t.id === overId);
    if (!overTask) return;

    // If tasks are in different columns, update the status
    if (activeTask.status !== overTask.status) {
      try {
        await handleEditTask(activeId, { status: overTask.status });
      } catch (error) {
        // Error already handled in handleEditTask
      }
      return;
    }

    // Same column - reorder (optional, for future enhancement)
    const oldIndex = tasks.findIndex((t) => t.id === activeId);
    const newIndex = tasks.findIndex((t) => t.id === overId);

    if (oldIndex !== newIndex) {
      setTasks((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const getTasksByStatus = (status) => {
    const filteredTasks = getFilteredAndSortedTasks();
    return filteredTasks.filter((task) => task.status === status);
  };

  console.log('🎨 XORO: Rendering, loading:', loading, 'tasks:', tasks.length);

  if (loading) {
    console.log('⏳ XORO: Rendering loading state');
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header 
          onAddTask={() => setIsModalOpen(true)} 
          onToggleFocusMode={handleToggleFocusMode}
          isFocusMode={isFocusMode}
          onSearch={handleSearch}
          onSort={handleSort}
          sortOrder={sortOrder}
        />
        <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10">
          <div className="flex flex-col lg:flex-row gap-6">
            {STATUS_ORDER.filter(status => !isFocusMode || status !== 'DONE').map((status) => (
              <div key={status} className="flex-1 min-w-[320px] max-w-[400px]">
                <div className="mb-5 px-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="skeleton h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="skeleton h-5 w-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  </div>
                </div>
                <div className="kanban-column">
                  <SkeletonLoader />
                </div>
              </div>
            ))}
          </div>
        </main>
        <Toaster {...toastOptions} />
      </div>
    );
  }

  console.log('✨ XORO: Rendering main app');
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Toaster {...toastOptions} />
      <Header 
        onAddTask={() => setIsModalOpen(true)} 
        onToggleFocusMode={handleToggleFocusMode}
        isFocusMode={isFocusMode}
        onSearch={handleSearch}
        onSort={handleSort}
        sortOrder={sortOrder}
      />
      
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {STATUS_ORDER.filter(status => !isFocusMode || status !== 'DONE').map((status) => (
              <KanbanColumn
                key={status}
                id={status}
                title={STATUS_MAP[status]}
                tasks={getTasksByStatus(status)}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                status={status}
              />
            ))}
          </div>
          <DragOverlay>
            {activeTask ? (
              <div className="task-card task-card-dragging shadow-2xl scale-105">
                <h3 className="font-semibold text-slate-900 text-[15px] mb-2">
                  {activeTask.title}
                </h3>
                {activeTask.description && (
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {activeTask.description}
                  </p>
                )}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTask}
      />
    </div>
  );
}

export default App;
