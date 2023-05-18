import React from 'react';
import {SettingsContext} from "../../Context/Settings";
import { Pagination } from '@mantine/core';

function List (){

  const [activePage, setActivePage] = React.useState(1);
  let allState = React.useContext(SettingsContext);
  const [currList, setCurrList] = React.useState([]);
  
  React.useEffect(()=>{
    let itemsToShow = allState.displayItems;
    console.log(itemsToShow);
    let list = [];
    let listFromContext = [];
    console.log(allState.hideCompleted);
    if(allState.hideCompleted){
      listFromContext = allState.list.filter(item => item.complete===false);
    }
    else{
      listFromContext = allState.list;
    }
    for(let i=0; i<itemsToShow; i++){
      if(listFromContext[i]){
        list.push(listFromContext[i]);
      }
    }
    console.log(list);
    setCurrList(list);
  }, [allState.list]);

  function setPage (e) {
    console.log(e); //---actually a number lol
    setActivePage(e);
    let lastIndex = e * allState.displayItems;
    let firstIndex = lastIndex-allState.displayItems;
    let newCurrList = allState.list.slice(firstIndex, lastIndex);
    setCurrList(newCurrList);
  }

  function toggleComplete(id) {

    const items = allState.list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
      }
      console.log(item);
      return item;
    });

    allState.setList(items);

  }

  return(
    <>
    {currList.map(item => (
      <div key={item.id}>
        <p>{item.text}</p>
        <p><small>Assigned to: {item.assignee}</small></p>
        <p><small>Difficulty: {item.difficulty}</small></p>
        <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
        <hr />
      </div>
    ))}
    <Pagination value={activePage} onChange={setPage} total={Math.ceil(allState.list.length/allState.displayItems)}/>
    </>
  )
}

export default List;