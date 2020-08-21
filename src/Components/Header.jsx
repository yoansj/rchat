import React, { useState } from 'react';

import { Redirect } from 'react-router';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import PersonIcon from '@material-ui/icons/Person';

function Header() {

    const [help, setHelp] = useState(false);
    const [profile, setProfile] = useState(false);

    const styles = {
        mainDiv: {
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
        },
        title: {
            fontFamily: 'Roboto Mono',
            fontSize: 50,
            fontWeight: 900,
            textAlign: 'center',
            paddingBottom: 0,
        },
        icon: {
            fontSize: 50,
            color: 'black',
        },
    }

    return (
        <div style={styles.mainDiv}>
            <Dialog open={help} onClose={() => setHelp(false)}>
                <DialogTitle>What's Rchat ?</DialogTitle>
                <h3>If you need help that much call 911</h3>
            </Dialog>
            <IconButton onClick={() => setHelp(true)}>
                <HelpIcon style={styles.icon} />
            </IconButton>
            <h1 style={styles.title}>Rchat</h1>
            <IconButton onClick={() => setProfile(true)}>
                <PersonIcon style={styles.icon} />
            </IconButton>
            {profile && <Redirect push to="/me" />}
        </div>
    )
}

export default Header;