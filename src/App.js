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
import TeamLeader from './components/TeamLeader';
import MatchingDate from './pages/MatchingDate';
import TeamRevise from './pages/TeamRevise';
import AffiliatedTeam from './pages/AffiliatedTeam';
import LeaderManage from './pages/LeaderManage';
import TeamInfo from './pages/TeamInfo';
import EditTeamInfo from './pages/EditTeamInfo';

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
                <Route path="/matching-date" component={MatchingDate} />
                <Route path="/team-revise" component={TeamRevise} />
                <Route path="/affiliated-team" component={AffiliatedTeam} />
                <Route path="/leader-manage" component={LeaderManage} />
                <Route path="/team-info" component={TeamInfo} />
                <Route path="/edit-team-info" component={EditTeamInfo} />
            </Switch>
        </Router>
    );
}

export default App;
