import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import "./fonts/pretendard/index.css";
import Splash from './pages/Splash';
import Start from './pages/Start';
import MemberInfo from './pages/MemberInfo';
import Main from './pages/Main';
import Reservation from './pages/Reservation'
import Location from './pages/Location'
import Matching from './pages/Matching'
import TeamRegister from './pages/TeamRegister';
import Profile from './pages/Profile';
import Setting from './pages/Setting';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Splash} exact />
        <Route path="/start" component={Start} />
        <Route path="/member-info" component={MemberInfo}/>
        <Route path="/main" component={Main} />
        <Route path="/reservation" component={Reservation} />
        <Route path="/location" component={Location} />
        <Route path="/matching" component={Matching} />
        <Route path="/team-register" component={TeamRegister} />
        <Route path="/profile" component={Profile} />
        <Route path="/setting" component={Setting} />
      </Switch>
    </Router>
  );
}

export default App;
