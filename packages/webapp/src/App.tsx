import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import {ErrorBoundary} from './components/error-boundary/ErrorBoundary';
import LandingPage from './components/landing-page/LandingPage';
import Boards from './components/boards/Boards';

const App = () => (
    <ErrorBoundary>
        <Router>
            <Route path='/' exact component={LandingPage} />
            <Route path='/boards' component={Boards} />
        </Router>
    </ErrorBoundary>
);

export default App;