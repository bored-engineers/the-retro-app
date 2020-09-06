import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { ErrorBoundary } from './components/common/error-boundary/ErrorBoundary';
import LandingPage from './components/landing-page/LandingPage';
import Boards from './components/board/Board';
import FeedbackSurvey from './components/feedback/FeedbackSurvey';
import reducer from './store/reducer';


const store = createStore(reducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

const App = () => (
    <ReduxProvider store={store}>
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