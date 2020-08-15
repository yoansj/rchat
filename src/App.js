import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Login from './Components/Login.jsx'

function App() {
    return (
    <div>
        <Router>
            <Switch>
                <Route exact path="/rchat">
                    <Login />
                </Route>
                <Route path="/choose">
                    <h6>Hello there</h6>
                </Route>
            </Switch>
        </Router>
    </div>
    );
}

export default App;
