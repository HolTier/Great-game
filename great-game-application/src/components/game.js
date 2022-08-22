import React from 'react';

const Game = (props) => {
    const num = range(1, 50);


    return (
        <div className="game-container">
            <div>
                <label>Name: {props.game.name} </label>
                <label>Game ID: {props.game.id} </label>
                <label>Prize: {props.game.prize}</label>
            </div>
            <div>
                <label>Start: {props.game.start} </label>
                <label>End: {props.game.end}</label>
            </div>
            <label>Select 6 numbers</label>
            <div className="six-numbers">
                <div>
                    <label>1: </label>
                    <select>
                        {num.map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>2: </label>
                    <select>
                        {num.map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>3: </label>
                    <select>
                        {num.map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>4: </label>
                    <select>
                        {num.map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>5: </label>
                    <select>
                        {num.map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>6: </label>
                    <select>
                        {num.map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <input type="submit" value="Add"/>
            </div>
        </div>
    );
};

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

export default Game;
