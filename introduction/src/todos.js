import { createStore } from 'redux'

export const model = {
    todos: [{
        text: 'Eat food',
        completed: true
    }, {
        text: 'Exercise',
        completed: false
    }],
    visibilityFilter: 'SHOW_COMPLETED'
}

const ADD_TODO = 'ADD_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const actions = [
    { type: ADD_TODO, text: 'Go to swimming pool' },
    { type: TOGGLE_TODO, index: 1 },
    { type: SET_VISIBILITY_FILTER, filter: 'SHOW_ALL' },
]

export const reducers = {

    visibilityFilter: (state = 'SHOW_ALL', action) => {
        if (action.type === SET_VISIBILITY_FILTER) {
            return action.filter
        } else {
            return state
        }
    },

    todos: (state = [], action) => {
        switch (action.type) {
            case ADD_TODO:
                return state.concat([{ text: action.text, completed: false }])
            case TOGGLE_TODO:
                return state.map((todo, index) =>
                    action.index === index
                        ? { text: todo.text, completed: !todo.completed }
                        : todo
                )
            default:
                return state
        }
    },
}

export const todoApp = (state = {}, action) => {
    return {
        todos: reducers.todos(state.todos, action),
        visibilityFilter: reducers.visibilityFilter(state.visibilityFilter, action)
    }
}

export const run = () => {
    console.log(`
#-------------------
# Todos reducer
#-------------------
`)

    // Create a Redux store holding the state of your app.
    // Its API is { subscribe, dispatch, getState }.
    let store = createStore(todoApp, model)
    console.log("Created Redux store. Reducer =", todoApp)
    console.log("The initial state =", store.getState())

    // You can use subscribe() to update the UI in response to state changes.
    // Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
    // However it can also be handy to persist the current state in the localStorage.

    store.subscribe(() => console.log("State =", store.getState()))

    // The only way to mutate the internal state is to dispatch an action.
    // The actions can be serialized, logged or stored and later replayed.
    actions.forEach((action, index) => {
        console.log(`\nDispatching action #${++index} with type '${action.type}'...`)
        store.dispatch(action)
    })
    console.log("Finished dispatching.")
}
