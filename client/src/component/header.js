import React from 'react';
import ProfilePic from '../images/BrockObama.jpg';

function Header() {
  return (
    <header className="Header">
        <div class="menu-icon">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <h1>POKEDEX</h1>
        <div className="profile-pic">
           <img src={ProfilePic}/>
        </div>
    </header>
  );
}

export default Header;
