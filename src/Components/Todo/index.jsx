import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form';
import {SettingsContext} from '../../Context/Settings';

import { v4 as uuid } from 'uuid';

import List from '../List';
import Header from '../Header';

const Todo = () => {
  let allState = React.useContext(SettingsContext);

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    allState.setList([...allState.list, item]);
  }

  function deleteItem(id) {
    const items = allState.list.filter( item => item.id !== id );
    allState.setList(items);
  }

  

  useEffect(() => {
    console.log('allstate.list has been updated', allState.list);
    let incompleteCount = allState.list.filter(item => !item.complete).length;
    allState.setIncomplete(incompleteCount);
    document.title = `To Do List: ${incompleteCount}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [allState.list]);  

  return (
    <>
      <Header/>

      <form onSubmit={handleSubmit}>

        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>

      <List/>

    </>
  );
};

export default Todo;
