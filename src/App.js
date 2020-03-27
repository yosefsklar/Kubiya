import React from 'react';
import {Route, Switch} from "react-router-dom";
import HomePage from './components/HomePage';
import MatchingGame from './components/MatchingGame';
import AboutPage from './components/AboutPage'
import './App.css';
import Navbar from "./components/assets/SiteNavBar";


function App() {
  return (
    <div className="App">
        <Navbar/>
        <Switch>
            <Route path="/matchingGame" component={MatchingGame} />
            <Route path="/about" component={AboutPage}/>
            <Route path="/" component={HomePage} />
        </Switch>
    </div>
  );
}

export default App;
