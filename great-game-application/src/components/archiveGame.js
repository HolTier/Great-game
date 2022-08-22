import React from 'react';

const ArchiveGame = (props) => {
    return (
        <div className="game-container">
            <div>
               <label>Name: {props.archiveGame.name} </label>
               <label>Game ID: {props.archiveGame.id} </label>
               <label>Prize: {props.archiveGame.prize}</label>
            </div>
            <div>
                <label>Start: {props.archiveGame.start} </label>
                <label>End: {props.archiveGame.end}</label>
            </div>
            <div>
                <label>Winning numbers:
                    {props.archiveGame.winningNum.map(num =>
                        <label key={num}>
                            {num}, {' '}
                        </label>)}
                </label>
            </div>
        </div>
    );
};

export default ArchiveGame;
