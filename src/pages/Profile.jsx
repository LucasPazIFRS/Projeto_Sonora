// src/pages/ProfilePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../scss/DefaultStyles.scss';
const Profile = () => {
  
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate('/login'); // Redirect to the Login page
  };
  
  return (
//botar um style={buttonStyle} dps
    <div>
      <h2>Perfil do Usuário</h2>
      <p>Informações sobre o perfil do usuário.</p>
      
      <button onClick={handleLogout} > 
        Sair
      </button>

    </div>


  );
};

export default Profile;
