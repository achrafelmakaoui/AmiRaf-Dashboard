import React from 'react'
import './Login.css'
import Amiraf from '../Assets/AmirafW.png'
import logo from '../Assets/login.png'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserShield, faKey, faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../redux/apiCalls";

const Login = () => {
    const [passwordType, setPasswordType] = useState('password');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching} = useSelector((state) => state.user);

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { email, password });
    };

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    }
  return (
    <div className='Login'>
        <div className='LoginDS'>
            <div className='LoginImg'>
                <div className='imgdivsheild'>
                    <img src={Amiraf} alt='Amiraf'/>
                </div>
            </div>
        </div>
        <div className='LoginDiv'>
            <div className='LoginInfo'>
                <h1>AmiRaf Dash!</h1>
                <p>Bienvenue sur notre page de connexion !<br/>
                Veuillez saisir vos identifiants ci-dessous.</p>
            </div>
            <div className='LoginForm'>
                <form className="formulaire">
                    <div className="textbox">
                        <input type="text" className='inputLg' id='email' name='email' onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder='Entre Email...'/>
                        <label htmlFor='email'>Email</label>
                        <FontAwesomeIcon icon={faUserShield} className='usr'/>
                    </div>
                    <div className="textbox">
                        <input type={passwordType} className='inputLg' id='password' name='password' onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder='Entre Mot De Passe...'/>
                        <label htmlFor='password'>Mot De Passe</label>
                        <FontAwesomeIcon icon={faKey} className='usr'/>
                    </div>
                    <div className='btnbnr'>
                        <button type="submit" onClick={handleClick} disabled={isFetching}>
                            Se Connecter
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                        <button id='btnshowpwd' onClick={togglePasswordVisibility}>
                            {passwordType === 'password' ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}  
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login