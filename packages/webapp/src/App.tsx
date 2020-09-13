import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { ErrorBoundary } from './components/common/error-boundary/ErrorBoundary';
import LandingPage from './components/landing-page/LandingPage';
import Boards from './components/board/Board';
import FeedbackSurvey from './components/feedback/FeedbackSurvey';
import reducer from './store/reducer';
import { socketMiddleware } from './store/middlewares';
import ToastMessage from './components/common/toast-message/ToastMessage';


const store = createStore(reducer, applyMiddleware(socketMiddleware()));

const App = () => (
    <ReduxProvider store={store}>
        <ToastMessage />
        <ErrorBoundary>
            <HashRouter>
                <Route path='/' exact component={LandingPage} />
                <Route path='/boards' component={Boards} />
                <Route path='/survey' component={FeedbackSurvey} />
            </HashRouter>
        </ErrorBoundary>
    </ReduxProvider>
);

export default App;