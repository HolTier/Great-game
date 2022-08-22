import React, {useEffect, useState} from 'react';
import Game from "../components/game";
import GamesDto from "../models/gamesDto";

const Home = () => {
    const games = [{
                name: 'mac',
                id: 1,
                prize: 200,
                start: '20-10-2013',
                end: '22-10-2013'
            },
            {
                name: 'scam',
                id: 2,
                prize: 20000,
                start: '21-10-2022',
                end: '22-10-202'
            }];
    return (
        <div>
            <h1>Home</h1>
            {games.map(game => <Game key={game.id} game={game} />)}
        </div>
    );
}

export default Home;