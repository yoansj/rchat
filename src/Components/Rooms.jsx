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

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Switch from '@material-ui/core/Switch';

import firebase from 'firebase';

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

function JoinRoom(room, setRedirect, setDialog, setCurrentRoom) {
    if (room[1].locked) {
        setCurrentRoom(room);
        setDialog(true);
    }
    else
        setRedirect(room[0]);
}

function RenderRooms(roomsArray, setRedirect, setDialog, setCurrentRoom) {

    return (
        roomsArray.map((room) =>
            <ListItem 
                button
                onClick={() => JoinRoom(room, setRedirect, setDialog, setCurrentRoom)}
            >
                <ListItemText primary={room[1].name} />
                <ListItemIcon>
                    {room[1].locked && <LockIcon />}
                </ListItemIcon>
            </ListItem>
        )
    );
}

function AddRoom() {

    const [show, setShow] = useState(false);
    const [name, setName] = useState("Change my opinion: Joseph Joestar is the best jojo");
    const [hasPassword, setHasPassword] = useState(false);
    const [password, setPassword] = useState("");

    function createRoom() {
        var newRoom = database.collection("rooms").doc();

        newRoom.set({
            name: name,
            locked: hasPassword,
            password: password,
            creator: [window.localStorage.getItem("uuid"), window.localStorage.getItem("username")]
        })
        .then(function() {
            setShow(false);
            // Afficher le message salle créée
        })
        .catch(function(error) {
            alert("error man");
            console.error(error);
        })
        newRoom.collection("messages").doc().set({
            message: "Welcome to the room :)",
            sender: "room",
            date: firebase.firestore.Timestamp.fromDate(new Date())
        })
        newRoom.collection("members").doc(window.localStorage.getItem("uuid")).set({
            member: [window.localStorage.getItem("uuid"), window.localStorage.getItem("username")]
        })
        .then(function() {
            // On rejoint la salle ici
        })
        .catch(function(error) {
            alert("error man");
            console.error(error);
        })
    }

    return (
        <div>
            <Dialog
            open={show}
            onClose={() => setShow(false)}
            aria-labelledby="room-dialog"
            aria-describedby="create-room"
            >
                <DialogTitle id='hmm-create-room'>Create a new room</DialogTitle>
                <DialogContent>
                    <TextField
                        id="room-name"
                        variant="outlined"
                        label={"Room name"}
                        defaultValue={name}
                        style={{width: 500}}
                        onChange={(event) => setName(event.currentTarget.value)}
                    />
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Switch name="hasPassword" checked={hasPassword} onChange={() => setHasPassword(!hasPassword)} />
                        <h3>Password</h3>
                    </div>
                    {hasPassword && 
                        <TextField
                            id="room-password"
                            variant="outlined"
                            label={"Password"}
                            style={{width: 500}}
                            onChange={(event) => setPassword(event.currentTarget.value)}
                        />
                    }
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => createRoom()}>Create</Button>
                </DialogActions>
            </Dialog>
            <Button color="primary" variant="contained" onClick={() => setShow(true)}>
                Create new room
            </Button>
        </div>
    );
}

function Rooms() {
    const classes = useStyles();

    const [rooms, setRooms] = useState([]);
    const [redirect, setRedirect] = useState("");
    const [dialog, setDialog] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [password, setPassword] = useState("");
    const [currentRoom, setCurrentRoom] = useState();

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

    function checkPassword() {
        if (password === currentRoom[1].password) {
            database.collection("rooms").doc(currentRoom[1].id).collection("members").doc(window.localStorage.getItem("uuid")).set({
                member: [window.localStorage.getItem("uuid"), window.localStorage.getItem("username")]
            });
            setRedirect(currentRoom[0]);
        }
        else
            setWrong(true);
    }

    return (
    <div>
        <Header left='help' right='profile'/>
        <Snackbar open={wrong} onClose={() => setWrong(false)} autoHideDuration={3000}>
            <MuiAlert onClose={() => setWrong(false)} severity="error">Bad password</MuiAlert>
        </Snackbar>
        <Dialog
            open={dialog}
            onClose={() => setDialog(false)}
            aria-labelledby="password-dialog"
            aria-describedby="enter-room-password"
        >
            <DialogTitle id='password-title'>This room is locked enter the password to continue</DialogTitle>
            <DialogContent>
                <TextField
                    id="password"
                    variant="outlined"
                    label={"Password"}
                    style={{width: 500}}
                    type='password'
                    onChange={(event) => setPassword(event.currentTarget.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => checkPassword()}>Enter</Button>
            </DialogActions>
        </Dialog>
        <div style={styles.mainDiv}>
            <AddRoom />
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
                {RenderRooms(rooms, setRedirect, setDialog, setCurrentRoom)}
            </List>
            {redirect !== "" && <Redirect push to={"/" + redirect} />}
        </div>
    </div>
    );
}

export default Rooms;