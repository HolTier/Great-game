import React from 'react';

const AccountInformation = () => {
    const tryGet = async () => {
        await fetch('/api/User/GetUserName/' + JSON.parse(sessionStorage.getItem('user')).userName, {
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
                sessionStorage.setItem('user', JSON.stringify(data));
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const getInformation = () => {
        tryGet();
        return(<div></div>);
    }
    return (
        <div className="account-inf">
            <label>Username: <b>{JSON.parse(sessionStorage.getItem('user')).userName}</b></label><br />
            <label>Cash: <b>{JSON.parse(sessionStorage.getItem('user')).cash}</b></label>
        </div>
    );
};

export default AccountInformation;
