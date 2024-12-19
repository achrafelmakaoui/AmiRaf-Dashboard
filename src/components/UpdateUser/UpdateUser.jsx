import React, { useEffect, useState } from 'react'
import './UpdateUser.css'
import { motion } from "framer-motion"
import axios from 'axios'
import { useSelector } from 'react-redux';

const UpdateTransaction = ({handleClose, userId}) => {
    const [user, setUser] = useState({});
    const [nomComplet, setNomComplet] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const currentUser = useSelector((state) => state.user.currentUser);
    const isAdmin = currentUser?.isAdmin;

    useEffect(() => {
        const getUser = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/api/users/find/${userId}`);
            setUser(res.data);
          } catch(err){
              console.log(err)
          }
        };
        getUser();
      }, [userId, user]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let updatedUserData;

            if (isAdmin) {
                updatedUserData = {
                    nomComplet,
                    email,
                    password,
                };
            }

            const response = await axios.put(`http://localhost:5000/api/users/${user._id}`, updatedUserData);
            console.log('User Info updated:', response.data);

            setUser(response.data);
            handleClose();
        } catch (error) {
            console.error('Error updating User Info:', error);
        }
    };

    const renderInputs = () => {
        if (isAdmin) {
            return (
                <>
                    <div className='addClientInputs'>
                        <div className='InputsClm1'>
                            <label>Nom Complet</label>
                            <input type='text' placeholder={user.nomComplet} value={nomComplet} onChange={(e) => setNomComplet(e.target.value)} required />
                        </div>
                        <div className='InputsClm1'>
                            <label>Email</label>
                            <input type='email' placeholder={user.email} value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div>
                    <div className='addClientInputs'>
                        <div className='InputsClm1'>
                            <label>Password</label>
                            <input type='password' placeholder='Enter New Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </div>
                </>
            );
        }
    };

  return (
        <div className='UpdateClientDiv'>
            <motion.div
                className="UpdateClientAlert"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{type: "spring", stiffness: 260, damping: 20}}
            >
                <div className='bannerUpdateClient'>
                    <div className='contentUpdateClient'>
                            <form onSubmit={handleSubmit}>
                                <div className='contentUpdateClientKey'>
                                    <h2>Update Credentials</h2>
                                    <div className='addClientBannerForm'>
                                        {renderInputs()}
                                    </div>
                                    <div className='btnSubmit'>
                                        <button type="submit">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                            </svg>
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </form>
                    </div>
                    <div className='CloseIcon'>
                        <svg onClick={handleClose} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>    
                    </div>
                </div>
            </motion.div>
        </div>
  )
}

export default UpdateTransaction

