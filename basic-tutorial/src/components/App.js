import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { todoApp as rootReducer } from '../reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

export class App extends React.Component {
    render () {
        return (
            <div>
                <AddTodo />
                <VisibleTodoList />
                <Footer />
            </div>
        );
    }
}

export const run = () => {
    const appName = 'Redux Basics. Todos App';

    console.log(`
#------------------------
# ${appName}
#------------------------
`);

    const store = createStore(rootReducer, devToolsEnhancer({ name: appName }));

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
};
