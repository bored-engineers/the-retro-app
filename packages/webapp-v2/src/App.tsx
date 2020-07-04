import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import LandingPage from './components/landing-page/LandingPage';
import Boards from './components/boards/Boards';

const App = () => (
    <Router>
        <Route path='/' exact component={LandingPage} />
        <Route path='/boards' component={Boards} />
    </Router>
);

export default App;