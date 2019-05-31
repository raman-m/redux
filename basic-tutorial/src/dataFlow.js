import { combineReducers } from 'redux';
import { addTodo, VisibilityFilters } from './actions';

const { SHOW_ALL } = VisibilityFilters;

function todos (state = [], action) {
    // Somehow calculate it...
    let nextState = null;
    switch (action.type) {
    // Some actions...
        default:
            nextState = state;
    }
    return nextState;
}

function visibleTodoFilter (state = SHOW_ALL, action) {
    // Somehow calculate it...
    let nextState = null;
    switch (action.type) {
    // Some actions...
        default:
            nextState = state;
    }
    return nextState;
}

export const todoApp = combineReducers({
    todos,
    visibleTodoFilter
});

export const run = () => {
    const appName = 'Redux Basics. Data Flow';

    console.log(`
#------------------------
# ${appName}
#------------------------
`);

    // The current application state (list of todos and chosen filter)
    let previousState = {
        visibleTodoFilter: SHOW_ALL,
        todos: [
            {
                text: 'Read the docs.',
                complete: false
            }
        ]
    };
    console.log('The previous state =', previousState);

    // The action being performed (adding a todo)
    let action = addTodo('Understand the flow.');

    // Your root-reducer returns the next application state
    let nextState = todoApp(previousState, action);
    console.log('\nNext state =', nextState);

    // Separate calling of non-root reducers
    let nextTodos = todos(nextState.todos, action);
    console.log('\nTodos state =', nextTodos);
    let nextVisibleTodoFilter = visibleTodoFilter(
        nextState.visibleTodoFilter,
        action
    );
    console.log('\nVisibleTodoFilter state =', nextVisibleTodoFilter);
};
