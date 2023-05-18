import React from 'react';
//import {SettingsContext} from "../../Context/Settings";
//import ''

function NavBar (){
  //let allState = React.useContext(SettingsContext);

  return(
    <nav className='nav'>
      <ul>
        <li>
          <a href='/'>Home</a>
        </li>
        <li>
          <a href='/settings'>Settings</a>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;