import React from 'react';
import {SettingsContext} from "../../Context/Settings";
import { Switch, NumberInput, NativeSelect, Button } from '@mantine/core';
import { useEffect } from 'react';

function Settings () {
  //GLOBAL STATE = allState
  let allState = React.useContext(SettingsContext);
  let itemsToShow = allState.displayItems;
  /*
    Heres whats in allState
    displayItems / setDisplayItems
    hideCompleted / setHideCompleted
    incomplete / setIncomplete
    list / setList
  */

    //LOCAL STATE
  const [hideCompleted, setHideCompleted] = React.useState(allState.hideCompleted);
  const [displayItems, setDisplayItems] = React.useState(allState.displayItems);

  const sortKeyWord = [
    'Difficulty'
  ];

  function handleUpdateSettings (e) {
    e.preventDefault();
    console.log('Local State: ', hideCompleted, displayItems);
    
    allState.setHideCompleted(hideCompleted);
    allState.setDisplayItems(displayItems);
  }

  useEffect(() => {
    let settings = {
      hideCompleted: hideCompleted,
      displayItems: displayItems
    }
    console.log(settings);
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [hideCompleted, displayItems]);

  return (
    <>
      <form onSubmit={handleUpdateSettings}>
        <Switch label='Hide Completed ToDos' onChange={(e) => setHideCompleted(e.currentTarget.checked)}/>
        <NumberInput label='Items Per Page' defaultValue={itemsToShow} onChange={(e) => setDisplayItems(e)}/>
        <NativeSelect data={sortKeyWord} label='Sort Keyword'/>
        <Button type='submit'>Update Settings</Button>
      </form>
      <div>
        <h2>Current Settings</h2>
        <div>Hide Completed: {hideCompleted}</div>
        <div>Items Per Page: {displayItems}</div>
      </div>
    </>
  )
}

export default Settings;