import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import {ErrorBoundary} from './components/common/error-boundary/ErrorBoundary';
import LandingPage from './components/landing-page/LandingPage';
import Boards from './components/board/Board';
import FeedbackSurvey from './components/feedback/FeedbackSurvey';

const App = () => (
    <ErrorBoundary>
        <HashRouter>
            <Route path='/' exact component={LandingPage} />
            <Route path='/boards' component={Boards} />
            <Route path='/survey' component={FeedbackSurvey} />
        </HashRouter>
    </ErrorBoundary>
);

export default App;