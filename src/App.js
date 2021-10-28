import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import "./fonts/pretendard/index.css";
import Main from './pages/Main';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} exact />
      </Switch>
    </Router>
  );
}

export default App;
