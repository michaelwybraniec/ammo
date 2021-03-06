import React, { ReactElement, useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import RouterFallback from 'RouterFallback';
import useWS from 'hooks/useWS';
import Home from 'pages/Home';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
// @ts-ignore
if (window.Cypress) {
    // @ts-ignore
    window.routerHistory = history;
}

const App = (): ReactElement => {
    const { init } = useWS();

    useEffect(() => {
        // The one and only place where ws should be init
        init();
    }, []);

    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="*">
                    <RouterFallback />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
