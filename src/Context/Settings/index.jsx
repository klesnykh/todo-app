import React from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider({ children }) {

  const [displayItems, setDisplayItems] = React.useState(3);
  const [hideCompleted, setHideCompleted] = React.useState(true);
  const [incomplete, setIncomplete] = React.useState([]);
  const [list, setList] = React.useState([]);

  return (
    <SettingsContext.Provider value={{ displayItems, setDisplayItems, hideCompleted, setHideCompleted, incomplete, setIncomplete, list, setList }}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;