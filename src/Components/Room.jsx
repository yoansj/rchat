import React, { useState, useEffect } from 'react';

import database from '../firebase';
import firebase from 'firebase';
import Header from './Header';

import { useParams, Redirect } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 600,
        height: 120,
        //background: 'linear-gradient(90deg, rgba(4,230,255,1) 0%, rgba(9,121,121,1) 48%, rgba(19,49,252,1) 100%)',
    },
}));


const styles = {
    mainDiv: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    roomName: {
        fontFamily: 'Roboto Mono',
        fontSize: 30,
        fontWeight: 900,
        textAlign: 'center',
        paddingBottom: 0,
    },
    messageSender: {
        fontFamily: 'Roboto Mono',
        fontSize: 20,
        fontWeight: 900,
        textDecoration: 'underline'
    },
    messageText: {
        fontFamily: 'Roboto Mono',
        fontSize: 15,
        fontWeight: 900,
    },
    messageDate: {
        fontFamily: 'Roboto Mono',
        fontSize: 20,
        fontWeight: 900,
    },
    messageBar: {
        position: 'absolute',
        bottom: 10,
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center'
    },
    messageDisplay: {
        overflow: 'auto',
        maxHeight: 600,
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    sendButton: {
        height: 50,
    },
    messageInput: {
        width: 500,
    }
}

function Room() {
    const st = useStyles();
    let { room } = useParams();
    const [roomInfo, setRoomInfo] = useState(undefined);
    const [messageList, setMessageList] = useState(undefined);
    const [userInfo, setUserInfo] = useState([]);
    const [isRoomBad, setIsRoomBad] = useState(false);

    const [message, setMessage] = useState("I, Giorno Giovanna will send a message");

    function createMessage(type, content) {
        database.collection("rooms").doc(room).collection("messages").doc().set({
            sender: userInfo,
            type: type,
            content: content,
            date: firebase.firestore.Timestamp.fromDate(new Date())
        }).then(setMessage(""))
    }

    function displayMessages() {
        if (messageList === undefined)
            return (<div></div>);
        return (
            messageList.map((message) => {
                return (
                <Paper className={st.root} variant="outlined">
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <h3 style={styles.messageSender}>{message.sender[1] + " "}</h3>
                        <h3 style={styles.messageDate}>{"-"}</h3>
                        <h3 style={styles.messageDate}>{message.date.toDate().toLocaleString()}</h3>
                    </div>
                    <h3 style={styles.messageText}>{message.content}</h3>
                </Paper>
                );
            })
        )
    }

    useEffect(() => {
        database.collection("rooms").doc(room).get().then(function(doc) {
            if (!doc.exists)
                setIsRoomBad(true);
            else {
                database.collection("rooms").doc(room)
                .onSnapshot(function(doc) {
                    setRoomInfo(doc);
                })
                database.collection("rooms").doc(room).collection("messages").orderBy("date", 'asc').onSnapshot(function(querySnapshot) {
                    let tmp = [];
                    querySnapshot.forEach(function(message) {
                        tmp.push(message.data());
                    })
                    setMessageList(tmp);
                    console.log(tmp);
                })
            }
        });

        setUserInfo([window.localStorage.getItem("uuid"), window.localStorage.getItem("username")]);

        return () => {
        }
    }, [room])

    return (
        <div style={styles.mainDiv}>
            <div>
                <Header left='rooms' right='profile' />
                {isRoomBad && <Redirect push to={`/404/`} />}
                {roomInfo && <h3 style={styles.roomName}>{roomInfo !== undefined && roomInfo.data().name}</h3>}
            </div>
            <div style={styles.messageDisplay}>
                {displayMessages()}
            </div>
            <div style={styles.messageBar}>
                <TextField
                    style={styles.messageInput}
                    id="message"
                    variant="outlined"
                    defaultValue={message}
                    label="Enter a message to be sent"
                    required multiline
                    value={message}
                    onChange={(event) => setMessage(event.target.value)} 
                />
                <Button style={styles.sendButton} color="primary" variant="contained" onClick={() => createMessage("text", message)}>
                    Send
                </Button>
            </div>
        </div>
    )
}

export default Room;