import { createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER,
    VisibilityFilters,
    addTodo,
    toggleTodo,
    setVisibilityFilter
} from './actions';

const { SHOW_ALL, SHOW_COMPLETED } = VisibilityFilters;

const visibilityFilter = (state = SHOW_ALL, action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];
        case TOGGLE_TODO:
            return state.map(todo => {
                if (todo.id === action.id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
        default:
            return state;
    }
};

export const todoApp = combineReducers({
    visibilityFilter,
    todos
});

export const run = () => {
    const appName = 'Redux Basics. Reducers';

    console.log(
        `#------------------------
# ${appName}
#------------------------
`
    );

    const store = createStore(todoApp, devToolsEnhancer({ name: appName }));

    // Log the initial state
    console.log('The initial state =', store.getState());

    // Every time the state changes, log it
    // Note that subscribe() returns a function for unregistering the listener
    const unsubscribe = store.subscribe(() =>
        console.log('\nState =', store.getState())
    );

    // Dispatch some actions
    store.dispatch(addTodo('Learn about actions'));
    store.dispatch(addTodo('Learn about reducers'));
    store.dispatch(addTodo('Learn about store'));
    store.dispatch(toggleTodo(0));
    store.dispatch(toggleTodo(1));
    store.dispatch(setVisibilityFilter(SHOW_COMPLETED));

    // Stop listening to state updates
    unsubscribe();
};
