import React from 'react';

import Todo from './Components/Todo';
import SettingsProvider from './Context/Settings';
import NavBar from './Components/NavBar';
import Settings from './Components/Settings'
import LoginProvider from './AuthContext/_context';
import Auth from './AuthContext/auth';
import Login from './AuthContext/login';


export default function App() {
  let component;
  switch(window.location.pathname){
    case '/':
      component = <Todo/>
      break
    case '/settings':
      component = <Settings/>
      break
    default:
      component = <Todo/>
  }

  return (
    <LoginProvider>
      <Login/>
      <Auth>
        <SettingsProvider>
          <NavBar />
          {component}
        </SettingsProvider>
      </Auth>
    </LoginProvider>
  );
}
