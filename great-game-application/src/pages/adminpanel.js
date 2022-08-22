import React from 'react';

const AdminPanel = () => {
    return (
        <div>
            <h1>Admin</h1>
            <form>
                <div>
                    <h3>Change user role</h3><br />
                    <input name="changeRoleUsername" type="text" placeholder="Username"/>
                    <select name="selectRole">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <input name="changeRoleBtn" type="button" value="Change"/>
                </div>
                <div>
                    <h3>Add game</h3><br />
                    <div>
                        <label>Type</label>
                        <select name="selectType">
                            <option value="normal">Normal</option>
                        </select><br />
                        <label>Start date</label>
                        <input type="date" name="addStartDate" /><br />
                        <label>End date</label>
                        <input type="date" name="addEndDate" /><br />
                        <input type="button"/>
                    </div>
                </div>
                <div>
                    <h3>Delete game</h3><br />
                    <input type="number" placeholder="Game ID"/>
                    <input type="button" value="Delete"/>
                </div>
                <div>
                    <h3>Add type</h3><br />
                    <input type="text" placeholder="Name"/>
                    <input type="Number" placeholder="Prize" /><br />
                    <input type="button" value="Add"/>
                </div>
                <div>
                    <h3>Delete type</h3><br />
                    <input type="text" placeholder="Name"/>
                    <input type="button" value="Delete"/>
                </div>
            </form>
        </div>
    );
};

export default AdminPanel;
