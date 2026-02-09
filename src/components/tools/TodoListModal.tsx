import React, { useState } from 'react';
import { useConfig } from '../../context/ConfigContext';
import { useTools } from '../../context/ToolsContext';
import { ToolsModalWrapper } from './ToolsModalWrapper';
import { Trash2, Check, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TodoListModal: React.FC = () => {
  const { isTodoListOpen, closeTodoList } = useConfig();
  const { todos, addTodo, toggleTodo, deleteTodo } = useTools();
  const [newTodo, setNewTodo] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <ToolsModalWrapper
      title={t('todoList.title')}
      isOpen={isTodoListOpen}
      onClose={closeTodoList}
      width="w-[400px]"
      height="h-[500px]"
    >
      <div className="flex flex-col h-full gap-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder={t('todoList.placeholder')}
            className="flex-1 bg-nc-bg-sidebar text-nc-text-primary px-3 py-2 rounded border border-nc-separator focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded transition-colors"
          >
            <Plus size={20} />
          </button>
        </form>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {todos.length === 0 ? (
            <div className="text-center text-nc-text-secondary py-8">
              {t('todoList.empty')}
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 bg-nc-bg-hover rounded group"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    todo.completed
                      ? 'bg-indigo-500 border-indigo-500 text-white'
                      : 'border-nc-text-secondary hover:border-indigo-500'
                  }`}
                >
                  {todo.completed && <Check size={14} />}
                </button>
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? 'text-nc-text-secondary line-through'
                      : 'text-nc-text-primary'
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-nc-text-secondary hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </ToolsModalWrapper>
  );
};
