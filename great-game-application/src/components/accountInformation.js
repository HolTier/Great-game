import React from 'react';

const AccountInformation = () => {
    //Get information about user from session storage
    return (
        <div className="account-inf">
            <label>Username: <b>{JSON.parse(sessionStorage.getItem('user')).userName}</b></label><br />
            <label>Cash: <b>{JSON.parse(sessionStorage.getItem('user')).cash}</b></label>
        </div>
    );
};

export default AccountInformation;
