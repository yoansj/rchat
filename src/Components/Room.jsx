import React, { useState, useEffect } from 'react';

import { useParams, Redirect } from "react-router-dom";

import database from '../firebase';
import Header from './Header';

const styles = {
    mainDiv: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    roomName: {
        fontFamily: 'Roboto Mono',
        fontSize: 30,
        fontWeight: 900,
        textAlign: 'center',
        paddingBottom: 0,
    },
}

function Room() {
    let { room } = useParams();
    const [roomInfo, setRoomInfo] = useState(undefined);
    const [userInfo, setUserInfo] = useState([]);
    const [isRoomBad, setIsRoomBad] = useState(false);

    useEffect(() => {

        // Savoir si la salle existe
        database.collection("rooms").doc(room).get().then(function(doc) {
            if (!doc.exists)
                setIsRoomBad(true);
            else {
                database.collection("rooms").doc(room)
                .onSnapshot(function(doc) {
                    setRoomInfo(doc);
                    console.log("room found !");
                })
            }
        });

        //Récup les infos de l'utilisateur
        setUserInfo([window.localStorage.getItem("uuid"), window.localStorage.getItem("username")]);

        return () => {
        }
    }, [room])

    return (
        <div>
            <Header left='rooms' right='profile' />
            <div>
                {isRoomBad && <Redirect push to={`/404/`} />}
                {roomInfo && <h3 style={styles.roomName}>{roomInfo !== undefined && roomInfo.data().name}</h3>}
                
            </div>
        </div>
    )
}

export default Room;