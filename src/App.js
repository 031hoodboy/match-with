import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
    AffiliatedTeam,
    EditTeamInfo,
    LeaderManage,
    Main,
    Matching,
    MatchingDate,
    MemberInfo,
    Profile,
    Register,
    Reservation,
    Setting,
    Splash,
    Start,
    TeamInfo,
    TeamLeader,
    TeamRegister,
} from '.';

export function App() {
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
                <Route path="/team-register" exact component={TeamRegister} />
                <Route path="/team-register/:id" component={TeamRegister} />
                <Route path="/profile" component={Profile} />
                <Route path="/setting" component={Setting} />
                <Route path="/team-leader" component={TeamLeader} />
                <Route path="/matching-date" component={MatchingDate} />
                <Route path="/affiliated-team" component={AffiliatedTeam} />
                <Route path="/leader-manage" component={LeaderManage} />
                <Route path="/team-info" component={TeamInfo} />
                <Route path="/edit-team-info" component={EditTeamInfo} />
            </Switch>
        </Router>
    );
}
