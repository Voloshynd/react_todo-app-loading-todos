/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import * as todosServices from '../src/api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { Error } from './components/Error/Error';
import { FilterType } from './types/FilterType';



enum ErrorMessages {
  loadTodos = 'Unable to load todos',
  emptyTitle = 'Title should not be empty',
  addTodo = 'Unable to add a todo',
  deleteTodo = 'Unable to delete a todo',
  updateTodo = 'Unable to update a todo',
}


export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<ErrorMessages | null>(null);
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.all);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);


  useEffect(() => {
    todosServices.getTodos()
      .then(data => setTodos(data))
      .catch(() => {
        setError(ErrorMessages.loadTodos);

        window.setTimeout(() => {
          setError(null);
        }, 3000);
      });
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  }, []);



  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {todos.length > 0 &&
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />}


          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              ref={inputRef}
            />
          </form>
        </header>

        <TodoList todos={todos} />
        {!!todos.length && (
          <Footer filterBy={filterBy} todos={todos} />
        )}

      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error error={error}/>

    </div>
  );
};
