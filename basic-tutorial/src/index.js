import { createStore } from 'redux'
import { devToolsEnhancer  } from 'redux-devtools-extension'
import {
    addTodo,
    toggleTodo,
    setVisibilityFilter,
    VisibilityFilters
  } from './actions'
import todoApp from './reducers'

const appName = "Redux Basics app"

console.log(`
#-------------------
# ${appName}
#-------------------
`)

const store = createStore(
    todoApp,
    devToolsEnhancer({ name: appName })
)

// Log the initial state
console.log("The initial state =", store.getState())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log("\nState =", store.getState()))

// Dispatch some actions
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// Stop listening to state updates
unsubscribe()