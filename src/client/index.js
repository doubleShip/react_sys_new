import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../common/store'
//import { browserHistory } from 'react-router'
//import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux';
import routes from '../common/routes';
import { sagaFetch } from '../common/sagas'

import './index.less';
const preloadedState = {};
const store = configureStore(preloadedState);
//const history = syncHistoryWithStore(browserHistory, store);

//执行saga
store.runSaga(sagaFetch);

//加入热替换
if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(
    <Provider store={store} /*history={history}*/ >
        { routes }
    </Provider>,
    document.getElementById('root')
);

