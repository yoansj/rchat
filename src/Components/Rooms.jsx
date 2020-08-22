import React, { useState, useEffect } from 'react';
import database from '../firebase';
import Header from './Header'

import { Redirect } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

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
    roomList: {
        maxWidth: '50%',
        overflow: 'auto',
        maxHeight: 500,
    }
}

function JoinRoom(event, room, setRedirect) {
    alert(room[0] + " " + room[1].name);
    setRedirect(room[0]);
}

function RenderRooms(roomsArray, setRedirect) {

    return (
        roomsArray.map((room) =>
            <ListItem 
                button
                onClick={(event) => JoinRoom(event, room, setRedirect)}
            >
                <ListItemText primary={room[1].name} />
                <ListItemIcon>
                    {room[1].locked && <LockIcon />}
                </ListItemIcon>
            </ListItem>
        )
    );
}

function Rooms() {
    const classes = useStyles();

    const [rooms, setRooms] = useState([]);
    const [redirect, setRedirect] = useState("");

    useEffect(() => {
        database.collection("rooms").onSnapshot(
            function(querySnapshot) {
                var test = [];
                querySnapshot.forEach(function(doc) {
                    test.push([doc.id, doc.data()]);
                    console.log(doc);
                    database.collection("rooms").doc(doc.id).collection("messages").onSnapshot(
                        function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                console.log("=>", doc.id, doc.data());
                            })
                        }
                    )
                })
                setRooms(test);
            }
        )
    }, [])

    return (
    <div>
        <Header left='help' right='profile'/>
        <div style={styles.mainDiv}>
            <List
            style={styles.roomList}
            component="nav"
            aria-label="rooms"
            className={classes.root}
            subheader={
                <ListSubheader component="div" id="rooms-subheader">
                    Rooms
                </ListSubheader>
            }
            >
                {RenderRooms(rooms, setRedirect)}
            </List>
            {redirect !== "" && <Redirect push to={"/" + redirect}  />}
        </div>
    </div>
    );
}

export default Rooms;