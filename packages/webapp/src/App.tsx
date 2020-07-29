import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import {ErrorBoundary} from './components/error-boundary/ErrorBoundary';
import LandingPage from './components/landing-page/LandingPage';
import Boards from './components/boards/Boards';

const App = () => (
    <ErrorBoundary>
        <HashRouter>
            <Route path='/' exact component={LandingPage} />
            <Route path='/boards' component={Boards} />
        </HashRouter>
    </ErrorBoundary>
);

export default App;