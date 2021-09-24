import React from 'react';

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
           {/* Insert profile pic here */}
        </div>
    </header>
  );
}

export default Header;
