import React from 'react';
import Sidebar from './sidebar/Sidebar'
import './App.css';
import Landing from './landing/Landing';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Sorting from './sorting/Sorting';
import PathFinder from './path-finder/PathFinder';
function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Switch>
          <Route path="/sorting">
            <Sorting />
          </Route>
          <Route path="/path-finder">
            <PathFinder />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
