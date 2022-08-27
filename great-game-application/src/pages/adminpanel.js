import React, {useState} from 'react';
import Game from "../components/game";

const AdminPanel = () => {
    //States
    //Add games
    const [types, setTypes] = useState([]);
    const [chooseType, setChooseType] = useState(0);
    const [canLoadTypes, setCanLoadTypes] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    //Change Role
    const [roles, setRoles] = useState([]);
    const [chooseRole, setChooseRole] = useState(0);
    const [canLoadRoles, setCanLoadRoles] = useState(true)
    const [usernameRole, setUsernameRole] = useState('');

    //Delete game
    const [gameID, setGameId] = useState(0);

    //Force win
    const [numbers, setNumbers] = useState([1, 1, 1, 1, 1, ]);
    const [winId, setWinId] = useState(0);
    const num = range(1, 50);

    //Add type
    const [typeName, setTypeName] = useState('');
    const [prizeGame, setPrizeGame] = useState(0);
    const [costGame, setCostGame] = useState(0);

    //Delete type
    const [deleteID, setDeleteId] = useState(0);

    //Http
    const tryGet = async (address, option) => {
        await fetch('/api/' + address, {
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
                if(option === 'type') {
                    setTypes(data);
                    //setChooseType(data[0].gameTypeId)
                    let num = JSON.stringify(data[0].gameTypeId)
                    setChooseType(num);
                }
                else if(option === 'role') {
                    setRoles(data);
                    let num = JSON.stringify(data[0].roleId)
                    setChooseRole(num);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const tryPut = async (address, option, jsonBody) => {
        await fetch('/api/' + address, {
            method: 'PUT',
            body: jsonBody,
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
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const tryPost = async (address, option, jsonBody) => {
        await fetch('/api/' + address, {
            method: 'POST',
            body: jsonBody,
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
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const tryDelete = async (address, option) => {
        await fetch('/api/' + address, {
            method: 'DELETE',
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
                console.log("HERE");
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    //components
    const selectRole = () => {
        if(canLoadRoles) {
            tryGet('User/GetRoles', 'role')
            setCanLoadRoles(false);
        }

        if( roles != null) {
            if(chooseRole === 0)
                setChooseRole(roles.roleId)

            console.log("ROLE" + chooseRole);
            return (
                <select onChange={handleRoleChanges} name="selectRole">
                    {roles.map((role) =>
                        <option key={role.roleId} value={role.roleId}>
                            {role.roleId} - {role.roleName}
                        </option>
                    )}
                </select>
            );
        }
        else
        {
            return(
                <p>no types</p>
            );
        }
    }

    const selectType = () => {
        if(canLoadTypes) {
            tryGet('Games/GetTypes', 'type')
            setCanLoadTypes(false);
        }

        if(types != null) {
            if(chooseType === 0)
                setChooseType(types.gameTypeId)

            console.log("SELECT: " + types.gameTypeId)
            return (
                <select onChange={handleTypeChanges} name="selectType">
                    {types.map(type =>
                        <option key={type.gameTypeId} value={type.gameTypeId}>
                            {type.gameTypeId}-{type.gameName}
                        </option>
                    )}
                </select>
            );
        }
        else
        {
            return(
                <p>no types</p>
            );
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

    //handlers
    const handleTypeChanges = e => {
        setChooseType(e.target.value);
    }

    const handleRoleChanges = e => {
        setChooseRole(e.target.value);
    }

    const handleSubmitRoleChange = (e) => {
        e.preventDefault();
        tryPut('User/ChangeRole', 'user', JSON.stringify({
            roleId: parseInt(chooseRole),
            username: usernameRole
        }));
    }

    const  handleSubmitAddGame = (e) => {
        e.preventDefault();
        tryPost('Games/AddGame', 'user', JSON.stringify({
            type: chooseType,
            start: startDate,
            end: endDate
        }));
    }

    const handleNumbersChanges = index => e => {
        let newArr = [...numbers]; //copy numbers array
        newArr[index] = parseInt(e.target.value);

        setNumbers(newArr);
    }

    const handleSubmitDeleteGame = (e) => {
        e.preventDefault();
        tryDelete('Games/DeleteGame/' + gameID, '');
    }

    const handleSubmitAddType = (e) => {
        e.preventDefault();
        tryPost('Games/AddType', '', JSON.stringify({
            gameName: typeName,
            prize: parseInt(prizeGame),
            cost: parseInt(costGame)
        }));
    }

    const handleSubmitDeleteType = (e) => {
        e.preventDefault();
        tryDelete('Games/DeleteType/' + deleteID, '');
    }

    const handleSubmitForceWin = (e) => {
        e.preventDefault();
        tryPut('Games/ForceWin', '', JSON.stringify({
            gameID: parseInt(winId),
            winningNumbers: numbers
        }));
    }

    return (
        <div>
            <h1>Admin</h1>
            {/* Role change for choose user */}
            <form onSubmit={handleSubmitRoleChange}>
                <div>
                    <h3>Change user role</h3><br />
                    <input name="changeRoleUsername" type="text" placeholder="Username" required
                           onChange={(e) => {setUsernameRole(e.target.value)}}/>
                    {selectRole()}
                    <input name="changeRoleBtn" type="submit" value="Change"/>
                </div>
            </form>
            {/* Add game */}
            <form onSubmit={handleSubmitAddGame}>
                <div>
                    <h3>Add game</h3><br />
                    <div>
                        <label>Type: </label>
                        {selectType()}<br />{/* Get types from api */}
                        <label>Start date</label>
                        <input type="date" name="addStartDate"
                               onChange={(e) => {setStartDate(e.target.value)}}/><br />
                        <label>End date</label>
                        <input type="date" name="addEndDate"
                               onChange={(e) => {setEndDate(e.target.value)}}/><br />
                        <input type="submit" value="Add"/>
                    </div>
                </div>
            </form>
            {/* Delete game */}
            <form onSubmit={handleSubmitDeleteGame}>
                <div>
                    <h3>Delete game</h3><br />
                    <input type="number" placeholder="Game ID" required
                           onChange={(e) => {setGameId(e.target.value)}}/>
                    <input type="submit" value="Delete"/>
                </div>
            </form>
            {/* Add type */}
            <form onSubmit={handleSubmitAddType}>
                <div>
                    <h3>Add type</h3><br />
                    <input type="text" placeholder="Name" required
                           onChange={(e) => {setTypeName(e.target.value)}}/><br />
                    <input type="Number" placeholder="Prize" required
                           onChange={(e) => {setPrizeGame(e.target.value)}}/>
                    <input type="Number" placeholder="Cost" required
                           onChange={(e) => {setCostGame(e.target.value)}}/><br />
                    <input type="submit" value="Add"/>
                </div>
            </form>
            {/* Delete type */}
            <form onSubmit={handleSubmitDeleteType}>
                <div>
                    <h3>Delete type</h3><br />
                    <input type="number" placeholder="Game ID" required
                           onChange={(e) => {setDeleteId(e.target.value)}}/>
                    <input type="submit" value="Delete"/>
                </div>
            </form>
            {/* Force win */}
            <form onSubmit={handleSubmitForceWin}>
                <div className="force-win">
                    <h3>Force Win</h3>
                    <input type="number" placeholder="Game ID " required
                           onChange={(e) => {setWinId(e.target.value)}}/>
                    {displayNumbers()}
                    <input type="submit" value="Add"/>
                </div>
            </form>
        </div>
    );
};

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

export default AdminPanel;
