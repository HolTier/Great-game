import React, {useState} from 'react';
import moment from "moment";

const Game = (props) => {
    const [numbers, setNumbers] = useState([1, 1, 1, 1, 1, ]);
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Error");
    const handleNumbersChanges = index => e => {
        let newArr = [...numbers]; // copying the old datas array
        newArr[index] = parseInt(e.target.value); // replace e.target.value with whatever you want to change it to

        setNumbers(newArr);
    }

    const tryAddGameUser = async () => {
        await fetch('/api/User/AddUserGame', {
            method: 'POST',
            body: JSON.stringify({
                gameId: props.game.gameId,
                userName: JSON.parse(sessionStorage.getItem('user')).userName,
                gameTypeId: props.game.gameTypeId,
                userNumbers: numbers

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Headers': 'privatekey'
            }
        })
            .then((response) => {
                if(!response.ok) throw new Error(response.status);
                else return response;
            })
            .then((data) => {
                alert("Successful join to game");
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err.message);
                setVisible(true);
                setErrorMessage(err.message);
            });
    };

    const handleAddClick = () => {
        let canAdd = true;
        for(let i = 0;i<5;i++)
        {
            for(let j = i+1; j<6; j++)
            {
                //console.log("i:" + i + " num: " + numbers[i] + "| j: " + j + " num: " + numbers[j]);
                if(numbers[i] === numbers[j])
                {
                    setVisible(true)
                    canAdd = false;
                    setErrorMessage("The numbers must be different")
                    //return;
                }
            }
        }

        if(canAdd)
        {
            console.log(JSON.stringify({
                gameId: props.game.gameId,
                userName: JSON.parse(sessionStorage.getItem('user')).userName,
                gameTypeId: props.game.gameTypeId,
                userNumbers: numbers
            }));
            tryAddGameUser();
        }
    };

    const error = () => {
        //console.log(visible)
        if(visible)
        {
            return(<div className="errorContainer"><p>{errorMessage}</p></div>)
        }
    }

    const displayNumbers = () => {
        return(
            <div>
                    <label>Select 6 numbers</label>
                    <div className="six-numbers">
                        <div>
                            <label><b>1: </b></label>
                            <select onChange={handleNumbersChanges(0)}>
                                {num.map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label> <b>2: </b></label>
                            <select onChange={handleNumbersChanges(1)}>
                                {num.map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label> <b>3: </b></label>
                            <select onChange={handleNumbersChanges(2)}>
                                {num.map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label> <b>4: </b> </label>
                            <select onChange={handleNumbersChanges(3)}>
                                {num.map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label> <b>5: </b> </label>
                            <select onChange={handleNumbersChanges(4)}>
                                {num.map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label> <b>6:</b> </label>
                            <select onChange={handleNumbersChanges(5)}>
                                {num.map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
        );
    }

    const num = range(1, 50);
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "numeric", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <div className="game-container">
            <div>
                <label>Name: <b>{props.game.gameName}</b> </label>
                <label>Game ID: <b>{props.game.gameId}</b> </label>
                <label>Prize: <b>{props.game.prize}</b> </label>
                <label>Cost: <b>{props.game.cost}</b> </label>
            </div>
            <div>
                <label>Start: <b>{formatDate(props.game.startDate)}</b> </label><br />
                <label>End: <b>{formatDate(props.game.endDate)}</b></label>
            </div>
            <div>
                {displayNumbers()}
            </div>
            <div>
                <input type="button" value="Add" onClick={handleAddClick}/>
            </div>

            {error()}
        </div>
    );
};

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

export default Game;
