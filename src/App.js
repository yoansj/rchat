import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";

import Login from './Components/Login.jsx'
import Rooms from './Components/Rooms.jsx'

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
                <Route path="/:room" children={<Room />}>
                </Route>
            </Switch>
        </Router>
    </div>
    );
}

function Room() {
    let { room } = useParams();

    return (
        <div>
            <h3>Room ID {room} </h3>
        </div>
    )
}

export default App;
