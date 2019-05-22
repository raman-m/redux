import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

const appName = "Counter Reducer"

function run() {
    console.log(`
#-------------------
# ${appName}
#-------------------
`)

    // Create a Redux store holding the state of your app.
    // Its API is { subscribe, dispatch, getState }.
    let store = createStore(
        counter,
        devToolsEnhancer({ name: appName })
    )
    console.log("Created Redux store. Reducer =", counter)
    console.log("The initial state =", store.getState())

    // You can use subscribe() to update the UI in response to state changes.
    // Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
    // However it can also be handy to persist the current state in the localStorage.

    store.subscribe(() => console.log(store.getState()))

    // The only way to mutate the internal state is to dispatch an action.
    // The actions can be serialized, logged or stored and later replayed.
    let actions = [
        { type: 'INCREMENT' },
        { type: 'INCREMENT' },
        { type: 'DECREMENT' },
    ]

    // output
    // 1
    // 2
    // 1
    actions.forEach((action, index) => {
        console.log(`Dispatching action #${++index} with type '${action.type}'...`)
        store.dispatch(action)
    })
    console.log("Finished dispatching.")
}

export { counter, run }
