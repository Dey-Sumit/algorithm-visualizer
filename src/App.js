import React from 'react';
import Sidebar from './sidebar/Sidebar'
import './App.css';
import Landing from './landing/Landing';
import { Switch, Route, useLocation } from 'react-router-dom'
import Sorting from './sorting/Sorting';
import PathFinder from './path-finder/PathFinder';
import Articles from './articles/Articles';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  return (

    <div className="app">
      <Sidebar />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/sorting">
            <Sorting />
          </Route>
          <Route exact path="/path-finder">
            <PathFinder />
          </Route>
          <Route exact path="/">
            <Landing />
          </Route>
        </Switch>
      </AnimatePresence>
      <Articles />
    </div>

  );
}

export default App;
