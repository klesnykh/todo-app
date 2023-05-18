import React from 'react';
import { useState, useEffect } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({});
  useEffect(() => {
    let settingsFromStorage = JSON.parse(localStorage.getItem('settings'));
    if(settingsFromStorage){
      setSettings(settingsFromStorage);
    }
  }, [])

  useEffect(() => {
    console.log(settings);
    setDisplayItems(settings.displayItems);
    setHideCompleted(settings.hideCompleted);
  }, [settings])

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