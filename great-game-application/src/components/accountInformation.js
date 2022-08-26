import React from 'react';

const AccountInformation = () => {
    return (
        <div className="account-inf">
            <label>Username: <b>{JSON.parse(sessionStorage.getItem('user')).userName}</b></label><br />
            <label>Cash: <b>{JSON.parse(sessionStorage.getItem('user')).cash}</b></label>
        </div>
    );
};

export default AccountInformation;
