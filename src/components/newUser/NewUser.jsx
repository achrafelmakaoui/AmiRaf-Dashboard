import React, { useState } from 'react'
import './NewUser.css'
import { motion } from "framer-motion"
import axios from 'axios'

const NewUser = ({handleClose , refreshUsers}) => {
    const [nomComplet, setNomComplet] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                nomComplet,
                email,
                password,
            };
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);
            console.log('User added:', response.data);
            refreshUsers();
            handleClose();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

  return (
    <div className='NewClientDiv'>
        <motion.div
            className="NewClientAlert"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{type: "spring", stiffness: 260, damping: 20}}
        >
            <div className='bannerNewClient'>
                <div className='contentNewClient'>
                    <form onSubmit={handleSubmit}>
                        <div className='contentNewClientKey'>
                            <h2>Add Client</h2>
                            <div className='addClientBannerForm'>
                                <div className='addClientInputs'>
                                    <div className='InputsClm1'>
                                        <label>Nom Complet</label>
                                        <input type='text' placeholder='Entrer Nom complet' value={nomComplet} onChange={(e) => setNomComplet(e.target.value)} required/>
                                    </div>
                                    <div className='InputsClm1'>
                                        <label>Email Address</label>
                                        <input type='text' placeholder='Entrer Email Address' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                    </div>
                                </div>
                                <div className='addClientInputs'>
                                    <div className='InputsClm1'>
                                        <label>Password</label>
                                        <input type='password' placeholder='Entrer Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                    </div>
                                </div>
                            </div>
                            <div className='btnSubmit'>
                                <button type="submit">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add
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

export default NewUser

