import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import PersonIcon from '@material-ui/icons/Person';
import ListIcon from '@material-ui/icons/List';

function Header(props) {

    const [help, setHelp] = useState(false);
    const [profile, setProfile] = useState(false);
    const [rooms, setRooms] = useState(false);

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

    function renderSide(what) {
        if (what === 'profile')
            return (
            <IconButton onClick={() => setProfile(true)}>
                <PersonIcon style={styles.icon} />
            </IconButton>
            )
        if (what === 'help')
            return (
            <IconButton onClick={() => setHelp(true)}>
                <HelpIcon style={styles.icon} />
            </IconButton>
            )
        if (what === 'rooms')
            return (
            <IconButton onClick={() => setRooms(true)}>
                <ListIcon style={styles.icon} />
            </IconButton>
            )
    }

    return (
        <div style={styles.mainDiv}>
            {(props.left === 'help' || props.right === 'help') &&
                <Dialog open={help} onClose={() => setHelp(false)}>
                    <DialogTitle>What's Rchat ?</DialogTitle>
                    <h3>If you need help that much call 911</h3>
                </Dialog>
            }
            {renderSide(props.left)}
            <h1 style={styles.title}>Rchat</h1>
            {renderSide(props.right)}
            {profile && <Redirect push to="/me" />}
            {rooms && <Redirect push to="/choose" />}
        </div>
    )
}

Header.propTypes = {
    right: PropTypes.oneOf([
        'profile',
        'rooms',
        'help'
    ]).isRequired,
    left: PropTypes.oneOf([
        'profile',
        'rooms',
        'help'
    ]).isRequired,
}

export default Header;