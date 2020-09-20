import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Login from './Components/Login.jsx'
import Rooms from './Components/Rooms.jsx'
import Profile from './Components/Profile.jsx'
import Room from './Components/Room.jsx'

function App() {
    return (
    <div>
        <Router>
            <Switch>
                <Route exact path="/rchat">
                    <Login />
                </Route>
                <Route path="/choose">
                    <Rooms />
                </Route>
                <Route path="/me">
                    <Profile />
                </Route>
                <Route path="/404">
                    <h6>This room does not exist yoo</h6>
                </Route>
                <Route path="/rooms/:room" children={<Room />} />
            </Switch>
        </Router>
    </div>
    );
}

export default App;
