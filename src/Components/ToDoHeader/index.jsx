import React from 'react';
import {SettingsContext} from "../../Context/Settings";

function Header (){
  let allState = React.useContext(SettingsContext);

  return(
    <header data-testid="todo-header">
      <h1 data-testid="todo-h1">To Do List: {allState.incomplete} items pending</h1>
    </header>
  )
}

export default Header;
