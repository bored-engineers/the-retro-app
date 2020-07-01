import React from 'react';
import './App.css';
import LandingPage from './Components/Client/LandingPage';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Board from './Components/Client/Board';
import NotFound from './Components/Client/NotFound';

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact children={<LandingPage />} />
          <Route path="/board/:id" children={<Board />} />
          <Route path="*" children={<NotFound />} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
