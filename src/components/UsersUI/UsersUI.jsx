import React, { useState, useEffect } from 'react'
import './UsersUI.css'
import axios from 'axios'
import NewClient from '../newUser/NewUser'

const UsersUI = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState(false);

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    const getUsers = async () => {
        try {
            const res = await axios.get('https://server.amiraf.shop/api/users/');
            setUsers(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(`https://server.amiraf.shop/api/users/${id}`);
            await getUsers();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handelClickCloseIcon = () => {
        setNewUser(false);
    };
    const handelClickNewTransaction = () => {
        setNewUser(true);
    };
  return (
    <div className='transactionUI'>
        <div className='headertransactionIcons'>
            <div className="bell">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
            </div>
            <div className='transactionAddIcon' onClick={handelClickNewTransaction}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </div>
        </div>
        <div className='transactionTable'>
            <div className='TransactionTableDs'>
                <table className='tableTrans'>
                    <tr className='trHead'>
                        <th>Nº</th>
                        <th>Nom Complet</th>
                        <th>Email Address</th>
                        <th>Status</th> 
                        <th>Date Entry</th> 
                        <th>Actions</th>
                    </tr>
                    {users.map((user,index) => (
                        <tr key={index}>
                            <td><span>{index + 1}</span></td>
                            <td><span>{user.nomComplet}</span></td>
                            <td><span>{user.email}</span></td>
                            <td><span>{formatDate(user.createdAt)}</span></td>
                            <td>
                                {(() => {
                                    let className, svgContent;

                                    switch (user.isAdmin) {
                                        case false:
                                            className = 'statusDvFrd';
                                            svgContent = (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#740505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                                    <line x1="12" y1="9" x2="12" y2="13"></line>
                                                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                                </svg>
                                            );
                                            break;
                                        case true:
                                            className = 'statusDv';
                                            svgContent = (
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#034b03" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                </svg>
                                            );
                                            break;
                                        default:
                                            break;
                                    }

                                    return (
                                        <div className={className}>
                                            {svgContent}
                                            <span>{user.isAdmin ? 'Admin':'Not Admin'}</span>
                                        </div>
                                    );
                                })()}
                            </td>
                            <td>
                                <div className='ActionsInfo'>
                                    <div className='ActionDelIcon' onClick={()=> deleteUser(user._id)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            <line x1="10" y1="11" x2="10" y2="17"></line>
                                            <line x1="14" y1="11" x2="14" y2="17"></line>
                                        </svg>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
        {newUser && <><NewClient handleClose={handelClickCloseIcon} refreshUsers={getUsers}/> </>}
    </div>
  )
}

export default UsersUI