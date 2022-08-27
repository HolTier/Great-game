import React, {useState} from 'react';
import ArchiveGame from "../components/archiveGame";

const Archive = () => {
    //constants
    const [archiveGames, setArchiveGames] = useState([]);//store archive games
    const [canLoad, setCanLoad] = useState(true)///prevents sending request to api and database

    //http
    //trying to get archive games for user
    const tryGetArchiveGames = async () => {
        await fetch('/api/Games/ArchiveGames/'+JSON.parse(sessionStorage.getItem('user')).userName, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Headers': 'privatekey'
            }
        })
            .then((response) => {
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((data) => {
                setArchiveGames(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    //Generate archival games if they exist, otherwise display a message
    const panel = () => {
        if(canLoad)
        {
            tryGetArchiveGames();
            setCanLoad(false);
        }

        if(archiveGames == null || archiveGames.length === 0)
            return(<p>No archival games</p>)
        else
            return (
                <div>
                    {archiveGames.map(archiveGame => <ArchiveGame key={archiveGame.gameId} archiveGame={archiveGame} />)}
                </div>)
    }

    return (
        <div>
            <h1>Archive</h1>
            {panel()}
        </div>
    );
};

export default Archive;
