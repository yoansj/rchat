import React, { useState } from 'react';

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

function Login() {
    const [name, setName] = useState("");
    const [err, setErr] = useState(null);
    const [redirect, setRedirect] = useState(false);

    function checkValidity() {
        if (name !== "" && name !== null) {
            setRedirect(true);
        } else {
            alert("Invalid name :(");
        }
    }

    return (
        <div style={styles.mainDiv}>
            <h1 style={styles.title}>
                Rchat
            </h1>
            <h1 style={styles.funnySentance}>
                {description[getRndInteger(0, description.length - 1)]}
            </h1>
            <TextField
                id="test"
                variant="outlined"
                defaultValue={names[getRndInteger(0, names.length)]}
                label={login[getRndInteger(0, login.length - 1)]}
                required
                onChange={(event) => setName(event.target.value)} 
            />
            <Button style={{paddingTop: 20}} color="primary" onClick={() => checkValidity()}>
                {enterButton[getRndInteger(0, enterButton.length - 1)]}
            </Button>
            {redirect && <Redirect push to="/choose" />}
        </div>
    );
}

export default Login;