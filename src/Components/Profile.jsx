import React from 'react';
import Header from './Header';

import { v4 as uuidv4 } from 'uuid';

import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';

const styles = {
    textFieldDiv: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
}

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            username:  window.localStorage.getItem("username"),
            uuid: window.localStorage.getItem("uuid"),
            showSucess: false,
            showError: false,
        }
    }

    resetUuid() {
        var tmp = uuidv4()
        this.setState({uuid: tmp});
        window.localStorage.setItem("uuid", tmp);
    }

    setUsername(name) {
        this.setState({username: name});
    }

    saveUsername() {
        if (this.state.username !== "") {
            window.localStorage.setItem("username", this.state.username);
            this.setState({showSucess: true});
        } else {
            this.setState({showError: true});
        }
    }

    render() {
        return (
            <div>
                <Header left='help' right='rooms' />
                <div style={{paddingTop: 150}}/>
                <div>
                    <Snackbar open={this.state.showSucess} onClose={() => this.setState({showSucess: false})} autoHideDuration={3000}>
                        <MuiAlert onClose={() => this.setState({showSucess: false})} severity="success">Username saved</MuiAlert>
                    </Snackbar>
                    <Snackbar open={this.state.showError} onClose={() => this.setState({showError: false})} autoHideDuration={3000}>
                        <MuiAlert onClose={() => this.setState({showError: false})} severity="error">Bad username not saved</MuiAlert>
                    </Snackbar>
                    <div style={styles.textFieldDiv}>
                        <TextField
                            id="username"
                            variant="outlined"
                            defaultValue={this.state.username}
                            label={"Your current username"}
                            style={{width: 500}}
                            onChange={(event) => this.setUsername(event.currentTarget.value)}
                            required
                        />
                        <div style={{paddingTop: 15}}/>
                        <Button color="primary" variant="contained" onClick={() => this.saveUsername()}>
                            Save
                        </Button>
                        <div style={{paddingTop: 30}}/>
                        <TextField
                            id="uuid"
                            variant="outlined"
                            value={this.state.uuid}
                            label={"Your uuid"}
                            style={{width: 500}}
                            InputProps={{readOnly: true}}
                        />
                        <div style={{paddingTop: 15}}/>
                        <Button color="primary" variant="contained" onClick={() => this.resetUuid()}>
                            Generate new one
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;