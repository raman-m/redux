import * as reducers from './reducers';
import * as dataFlow from './dataFlow';
import * as app from './components/App';

reducers.run();
dataFlow.run();
app.run();
