import React, {useEffect, useState} from 'react';
import Game from "../components/game";
import GamesDto from "../models/gamesDto";
import {Get} from "../api/restapi";
import {wait} from "@testing-library/user-event/dist/utils";

const Home = () => {
    const [game, setGame] = useState([]);//store active games
    const [canLoad, setCanLoad] = useState(true);

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
                console.log(data);
                setGame(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const panel = () => {
        if(canLoad)
        {
            tryGetGames();
            setCanLoad(false);
        }
        console.log("game"+ game);
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