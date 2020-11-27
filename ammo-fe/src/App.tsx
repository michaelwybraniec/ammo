import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootReducer } from 'redux/reducers';
import useWS from 'hook/useWS';
import { Bullet } from 'shared/typings/Bullet';

function App(): React.ReactElement {
    useWS();

    const connected = useSelector((state: RootReducer) => state.ws.connected);
    const bullets = useSelector((state: RootReducer) => state.bullets);

    return (
        <div className="App">
            <header className="App-header">
                {bullets && (
                    <div data-cy="bullets">
                        {bullets.map((bullet: Bullet, index: number) => (
                            <div key={index}>{bullet.url}</div>
                        ))}
                    </div>
                )}
                {connected ? (
                    <>
                        <p data-cy="ws-connected">
                            Edit <code>src/App.tsx</code> and save to reload.
                        </p>
                        <a
                            className="App-link"
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Learn React
                        </a>
                    </>
                ) : (
                    <p
                        data-cy="ws-not-connected"
                        style={{ color: 'red', fontSize: '22px' }}
                    >
                        You're not connected
                    </p>
                )}
            </header>
        </div>
    );
}

export default App;
