import React, {useState} from 'react';
import ArchiveGame from "../components/archiveGame";
import Game from "../components/game";

const Archive = () => {
    const [archiveGames, setArchiveGames] = useState([]);
    const [canLoad, setCanLoad] = useState(true)

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
                console.log(data);
                setArchiveGames(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const panel = () => {
        if(canLoad)
        {
            tryGetArchiveGames();
            setCanLoad(false);
        }

        console.log(archiveGames);
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
