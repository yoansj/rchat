import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Redirect } from 'react-router';

import { description, enterButton, login, names } from './login';
import { getRndInteger } from './utils';

import database from '../firebase';

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
            tag: "random",
            roomId: "",
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
            window.localStorage.setItem("username", this.state.name);
            window.localStorage.setItem("uuid", uuidv4());
            database.collection("rooms").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    if (doc.data().tag === this.state.tag) {
                        console.log("Room found: Going in");
                        this.setState({roomId: doc.id});
                        this.setRedirect(true);
                    }
                }.bind(this))
                if (!this.state.redirect) {
                }
            }.bind(this))
        } else {
            alert("Invalid name :(");
        }
    }

    render() {
        return (
        <div style={styles.mainDiv}>
            <h1 style={styles.title}>Rchat</h1>
            <h3 style={styles.funnySentance}>
                {this.state.description}
            </h3>
            <TextField
                id="id"
                variant="outlined"
                defaultValue={this.state.defaultName}
                label={this.state.identify}
                required
                onChange={(event) => this.setName(event.target.value)} 
            />
            <div style={{paddingTop: 20}}/>
            <TextField
                id="tag"
                variant="outlined"
                defaultValue={this.state.tag}
                label="Enter a tag"
                required
                onChange={(event) => this.setState({tag: event.target.value})} 
            />
            <div style={{paddingTop: 20}}/>
            <Button color="primary" variant="contained" onClick={() => this.checkValidity()}>
                {this.state.joinButton}
            </Button>
            {this.state.redirect && <Redirect push to={`/rooms/${this.state.roomId}`} />}
        </div>
        );
    }
}

export default Login;