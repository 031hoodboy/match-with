import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import "./fonts/pretendard/index.css";
import Splash from './pages/Splash';
import Start from './pages/Start';
import Register from './pages/Register';
import MemberInfo from './pages/MemberInfo';
import Main from './pages/Main';
import Reservation from './pages/Reservation';
import Matching from './pages/Matching';
import TeamRegister from './pages/TeamRegister';
import Profile from './pages/Profile';
import Setting from './pages/Setting';
import MatchingTeam from './pages/MatchingTeam';
import TeamLeader from './pages/TeamLeader';
import TeamMember from './pages/TeamMember';
import MatchingDate from './pages/MatchingDate';
import TeamRevise from './pages/TeamRevise';
import AffiliatedTeam from './pages/AffiliatedTeam';
import LeaderManage from './pages/LeaderManage';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Splash} exact />
                <Route path="/start" component={Start} />
                <Route path="/register" component={Register} />
                <Route path="/member-info" component={MemberInfo} />
                <Route path="/main" component={Main} />
                <Route path="/reservation" component={Reservation} />
                <Route path="/matching" component={Matching} />
                <Route path="/team-register" component={TeamRegister} />
                <Route path="/profile" component={Profile} />
                <Route path="/setting" component={Setting} />
                <Route path="/matching-team" component={MatchingTeam} />
                <Route path="/team-leader" component={TeamLeader} />
                <Route path="/team-member" component={TeamMember} />
                <Route path="/matching-date" component={MatchingDate} />
                <Route path="/team-revise" component={TeamRevise} />
                <Route path="/affiliated-team" component={AffiliatedTeam} />
                <Route path="/leader-manage" component={LeaderManage} />
            </Switch>
        </Router>
    );
}

export default App;
