import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import "./fonts/pretendard/index.css";
import Splash from './pages/Splash';
import Start from './pages/Start';
import MemberInfo from './pages/MemberInfo';
import Main from './pages/Main';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Splash} exact />
        <Route path="/start" component={Start} />
        <Route path="/member-info" component={MemberInfo}/>
        <Route path="/main" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
