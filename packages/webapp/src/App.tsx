import React from 'react';
import './App.css';
import LandingPage from './Components/Client/LandingPage';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Board from './Components/Client/Board';

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact children={<LandingPage />} />
          <Route path="/board/:id" children={<Board />} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
