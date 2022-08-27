import React, {useState} from 'react';
import AccountInformation from "../components/accountInformation";

const Account = () => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [addCash, setAddCash] = useState();

    const tryPutChange = async (address, jsonBody) => {
        await fetch('/api/User/' + address, {
            method: 'PUT',
            body: jsonBody ,
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
                sessionStorage.setItem('user', JSON.stringify(data));
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleSubmitUsername = (e) => {
        e.preventDefault();
        tryPutChange('ChangeUsername', JSON.stringify({
            oldUsername: JSON.parse(sessionStorage.getItem('user')).userName,
            newUsername: username,
        }));
    }

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        console.log(newPassword);
        tryPutChange('ChangePassword', JSON.stringify({
            username: JSON.parse(sessionStorage.getItem('user')).userName,
            password: newPassword,
        }));
    }

    const handleSubmitAddCash = (e) => {
        e.preventDefault();
        console.log(JSON.parse(sessionStorage.getItem('user')));
        tryPutChange('AddCash', JSON.stringify({
            username: JSON.parse(sessionStorage.getItem('user')).userName,
            cash: parseInt(addCash),
        }));
    }

    return (
        <div>
            <h1>Account</h1>
            <AccountInformation />
            <div className="account-form">
                <form onSubmit={handleSubmitUsername}>
                    <div className="change-username">
                        <label>Change username</label><br />
                        <input type="text" name="changeUsername" placeholder="Username" required
                            onChange={(e) => {setUsername(e.target.value)}}/>
                        <input name="changeUsernameBtn" type="submit" value="Change" />
                    </div>
                </form>
                <form onSubmit={handleSubmitPassword}>
                    <div className="change-password">
                        <label>Change password</label><br />
                        <input type="password" name="changePassword" placeholder="Password" required
                               onChange={(e) => {setNewPassword(e.target.value)}}/>
                        <input name="changePasswordBtn" type="submit" value="Change"/>
                    </div>
                </form>
                <form onSubmit={handleSubmitAddCash}>
                    <div>
                        <label>Add cash</label><br />
                        <input type="number" name="addCash" placeholder="Add" required
                               onChange={(e) => {setAddCash(e.target.value)}}/>
                        <input name="addCashBtn" type="submit" value="Add"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Account;
