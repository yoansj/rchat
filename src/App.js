import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Login from './Components/Login.jsx'
import Profile from './Components/Profile.jsx'
import Room from './Components/Room.jsx'

function App() {
    return (
    <div>
        <Router>
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route path="/me">
                    <Profile />
                </Route>
                <Route path="/rooms/:room" children={<Room />} />
                <Route path="/404">
                    <h6>This room does not exist yoo</h6>
                </Route>
                <Route path="*">
                    <h6>This room does not exist yoo</h6>
                </Route>
            </Switch>
        </Router>
    </div>
    );
}

export default App;
