import React from 'react';
import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  filterBy: FilterType;
  todos: Todo[];
  todosCounter: number
};

const Footer: React.FC<Props> = React.memo(({ filterBy, todos, todosCounter }) => {
  // const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {/* 3 items left */}
        {todosCounter} {todosCounter === 1 ? 'item left' : 'items left'}
      </span>
      Active link should have the 'selected' class
      <nav className="filter" data-cy="Filter">
        <a href="#/" className="filter__link selected" data-cy="FilterLinkAll">
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filterBy === 'active' })}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>
      this button should be disabled if there are no completed todos
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;

