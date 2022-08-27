import React, {useState} from 'react';
import Game from "../components/game";

const Home = () => {
    const [game, setGame] = useState([]);//store active games
    const [canLoad, setCanLoad] = useState(true);//prevents sending request to api and database

    //Get active game array from api server
    const tryGetGames = async () => {
        await fetch('/api/Games/ActiveGamesUser/'+JSON.parse(sessionStorage.getItem('user')).userName, {
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
                setGame(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    //Generate games if they exist, otherwise display a message
    const panel = () => {
        if(canLoad)
        {
            tryGetGames();
            setCanLoad(false);
        }

        if(game == null || game.length === 0)
            return(<p>No active games</p>)
        else
            return (
                <div>
                    {game.map(game => <Game key={game.gameId} game={game} />)}
                </div>)
    }

    return (
        <div>
            <h1>Home</h1>
            {panel()}
        </div>
    );
}

export default Home;