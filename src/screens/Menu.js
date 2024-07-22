import React, { useState }from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import logo from '../images/LogoMenu.png'; // Import the logo
import '../stylesheet/menu.css'; 

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isLoginHovered, setLoginHovered] = useState(false);
  const [isRegisterHovered, setRegisterHovered] = useState(false);
  return (
    
    <nav className="menu">
<div style={{ display: 'flex', alignItems: 'center' }}>
  <img src={logo} alt="Logo" style={{ marginRight: '10px', width: '200px' }} />
</div>
    <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
      <li>
      <Link to="/PrincipalScreen" onClick={() => setActiveTab('theatre')} className={activeTab === 'theatre' ? 'active' : ''}>Théatres</Link>
      
        </li>
        <li>
      <Link to="/comment" onClick={() => setActiveTab('theatre')} className={activeTab === 'theatre' ? 'active' : ''}>Commentaires</Link>
      
        </li>
        <li>
      <Link to="/utilisateurs" onClick={() => setActiveTab('theatre')} className={activeTab === 'theatre' ? 'active' : ''}>Utilisateurs</Link>
      
        </li>

          <li>
          </li>
        </ul>
      </nav>
      
  );
};

export default Menu;