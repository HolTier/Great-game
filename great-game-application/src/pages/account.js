import React, {useState} from 'react';
import LoginDto from "../models/loginDto";

const Account = () => {
    const newUser = JSON.parse(sessionStorage.getItem('user'));
    const [user, setUser] = useState(Object.assign(new LoginDto(), newUser));
    return (
        <div>
            <h1>Account</h1>
            <p>{console.log(user)}</p>
            <div className="accountform">
                <form>
                    <div>
                        <label>Change username</label><br />
                        <input type="text" name="changeUsername" placeholder="Username"/>
                        <input name="changeUsernameBtn" type="button" value="Change"/>
                    </div>
                    <div>
                        <label>Change password</label><br />
                        <input type="password" name="changePassword" placeholder="Password"/>
                        <input name="changePasswordBtn" type="button" value="Change"/>
                    </div>
                    <div>
                        <label>Add cash</label><br />
                        <input type="number" name="addCash" placeholder="Add"/>
                        <input name="addCashBtn" type="button" value="Add"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Account;
