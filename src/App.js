import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import "./fonts/pretendard/index.css";
import Splash from './pages/Splash';
import Start from './pages/Start';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Splash} exact />
        <Route path="/start" component={Start} exact />
      </Switch>
    </Router>
  );
}

export default App;
