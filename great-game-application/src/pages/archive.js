import React from 'react';
import ArchiveGame from "../components/archiveGame";

const Archive = () => {
    const archiveGames = [{
        name: 'Big game',
        id: 152121,
        prize: 121111111,
        start:'20-10-2022',
        end: '20-10-2022',
        winningNum: [1,2,10,22,49,50],
    }];
    return (
        <div>
            <h1>Archive</h1>
            {archiveGames.map(archiveGame => <ArchiveGame key={archiveGame.id} archiveGame={archiveGame} />)}
        </div>
    );
};

export default Archive;
