import React, { useState, useEffect} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Redirect } from 'react-router';

import { description, enterButton, login, names } from './Login';
import { getRndInteger } from './utils';

const styles = {
    mainDiv: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        fontFamily: 'Roboto Mono',
        fontSize: 50,
        fontWeight: 900,
        textAlign: 'center',
        paddingBottom: 0
    },
    funnySentance: {
        fontFamily: 'Roboto Mono',
        fontSize: 30,
        fontWeight: 900,
        textAlign: 'center',
        paddingBottom: 50
    }
}

class Login extends React.Component {
    constructor() {
        super();
        this.defaultName = names[getRndInteger(0, names.length - 1)];
        this.state = {
            description: description[getRndInteger(0, description.length - 1)],
            defaultName: this.defaultName,
            identify: login[getRndInteger(0, login.length - 1)],
            joinButton: enterButton[getRndInteger(0, enterButton.length - 1)],
            name: this.defaultName,
            redirect: false,
        }
    }

    setRedirect(bool) {
        this.setState({redirect: bool});
    }

    setName(name) {
        this.setState({name: name});
    }

    checkValidity() {
        if (this.state.name !== "" && this.state.name !== null) {
            this.setRedirect(true);
            window.localStorage.setItem("username", this.state.name);
        } else {
            alert("Invalid name :(");
        }
    }

    render() {
        return (
            <div style={styles.mainDiv}>
            <h1 style={styles.title}>
                Rchat
            </h1>
            <h3 style={styles.funnySentance}>
                {this.state.description}
            </h3>
            <TextField
                id="test"
                variant="outlined"
                defaultValue={this.state.defaultName}
                label={this.state.identify}
                required
                onChange={(event) => this.setName(event.target.value)} 
            />
            <div style={{paddingTop: 20}}/>
            <Button color="primary" onClick={() => this.checkValidity()}>
                {this.state.joinButton}
            </Button>
            {this.state.redirect && <Redirect push to="/choose" />}
        </div>
        );
    }
}

export default Login;