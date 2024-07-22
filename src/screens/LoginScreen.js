import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/logo.png'; // Import the logo
import "../stylesheet/login.css";


const LoginScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('fougerassacha@gmail.com');
    const [password, setPassword] = useState('A$a45zey&$uio0ù6*5698*');
    const [showPassword, setShowPassword] = useState(false);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('https://api.triaonline.live/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        const responseData = await response.json();
    
        if (responseData.status_code === 200) {
          // Store the authentication token
          const token = responseData.token;
          localStorage.setItem('token', token);
    
          navigate('/PrincipalScreen');
          alert('Vous vous êtes bien authentifié !');
        } else {
          alert('Email ou mot de passe incorrect !');
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
        
            
        <div className="container">
        <img src={logo} alt="logo" className='logo2'/>
        <div>
          <div>
            <h2 style={{ textAlign: 'center' }} className='titre'>Connectez-vous</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputGroup">
                <label>Email:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="inputGroupInput" />
              </div>
              
              <div className="inputGroup inputGroupWithIcon">
  <label>Mot de passe:</label>
  <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required className="inputGroupInput"  />
  <button type="button" onClick={() => setShowPassword(!showPassword)} className="eyeButton">
    {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
  </button>
</div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button type="submit" className="button">CONNEXION</button>
            </div>
            </form>
          </div>
          </div>
        </div>
      );
  };
  
  export default LoginScreen;