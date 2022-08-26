import React from 'react';

const ArchiveGame = (props) => {

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const winningNumbers = () => {
        if(props.archiveGame.winningNumbers == null)
        {
            return (<label></label>)
        }
        else
        {
            return(
                <label>
                    Winning numbers:
                    {props.archiveGame.winningNumbers.map(num =>
                        <label key={num}>
                            {num}, {' '}
                        </label>)}
                </label>
            )
        }
    }

    return (
        <div className="game-container">
            <div>
                <label>Name: <b>{props.archiveGame.name}</b> </label>
                <label>Game ID: <b>{props.archiveGame.gameId}</b> </label>
                <label>Prize: <b>{props.archiveGame.prize}</b> </label>
                <label>Cost: <b>{props.archiveGame.cost}</b> </label>
            </div>
            <div>
                <label>Start: <b>{formatDate(props.archiveGame.startDate)}</b> </label><br />
                <label>End: <b>{formatDate(props.archiveGame.endDate)}</b></label>
            </div>
            <div>
                {winningNumbers()}
            </div>
            <div>
                <label>Your numbers:
                    {props.archiveGame.userNumbers.map(num =>
                        <label key={num}>
                            {num}, {' '}
                        </label>)}
                </label>
            </div>
        </div>
    );
};

export default ArchiveGame;
