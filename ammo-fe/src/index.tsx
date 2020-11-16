import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'App';
import reportWebVitals from 'reportWebVitals';
import store from 'redux/store';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from 'material/Theme';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    <App />
                </CssBaseline>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

/* Is a perfermance measurement tool, refer to the doc : https://create-react-app.dev/docs/measuring-performance/
    Can be useful to gather some client related metrics, need to pass a function
*/
reportWebVitals();