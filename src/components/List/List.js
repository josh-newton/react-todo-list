import { useState } from 'react';
import './List.scss';

function List({
  list,
  priorities,
  sort,
  isEmpty,
  onAddNewItem,
  onEditItem,
  onRemoveItem,
  onClearAll,
  onToggleSort
}) {

  const [newItem,       setNewItem] = useState({}),
        [addItemActive, setAddItemActive] = useState(false),
        [editItemId,    setEditItemId] = useState(null);

  function updateAddItemActive(value) {
    setAddItemActive(value);

    // Wait for add new item to be displayed and then auto focus on it
    setTimeout(() => {
      if (value) {
        document.querySelector('.add-new-row input[type="text"]').focus();
      }
    });
  }

  function validateNewItem() {
    // Ensure both inputs are filled before adding new item
    // TODO:
    // Add more validation i.e. min length
    // Display errors to user
    if (newItem.text !== '' && newItem.text !== undefined && newItem.priority !== undefined) {
      onAddNewItem(newItem);
      updateAddItemActive(false);
      setNewItem({});
    }
  }

  let sortedList,
      addItemRow = null,
      todoItemRows = null;

  if (sort) {
    sortedList = list.sort((a, b) => b.priority - a.priority);
  } else {
    sortedList = list.sort((a, b) => a.priority - b.priority);
  }

  if (addItemActive) {
    addItemRow = (
      <tr
        className="add-new-row">
        <td>
          <input
            type="text"
            placeholder="New todo..."
            value={ newItem.text }
            onChange={ (e) => { newItem.text = e.target.value; validateNewItem(); } }/>
        </td>
        <td className="item-priority">
          <select
            value={ newItem.priority }
            onChange={ (e) => { newItem.priority = e.target.value; validateNewItem(); } }
            defaultValue="undefined">
            <option
              disabled="disabled"
              value="undefined">
                Priority...
            </option>
            {
              priorities.map((item, index) => {
                return (
                  <option key={ item } value={ index }>{ item }</option>
                )
              })
            }
          </select>
        </td>
        <td className="remove-button">
          <i className="fas fa-times"
             onClick={ () => { updateAddItemActive(false); setNewItem({}); } }>
          </i>
        </td>
      </tr>
    )
  }

  // If todo list is empty, display completed
  if (isEmpty) {
    todoItemRows = (
      <tr>
        <td colSpan="3">
          <p>Well done! You've completed all your todos.</p>
        </td>
      </tr>
    )
  } else if (!sortedList.length) {
    // else if length of the list is 0, then display search doesn't match any todos
    todoItemRows = (
      <tr>
        <td colSpan="3">
          <p>No todos found. Please try another search query.</p>
        </td>
      </tr>
    )
  } else {
    // else display todos
    todoItemRows = (
      sortedList.map((item) => {
        return (
          <tr key={ item.id }>
            <td className="item-text">
              <input
                type="text"
                value={ item.text }
                onChange={ (e) => { item.text = e.target.value; onEditItem(item); } }
                onBlur={ () => { setEditItemId(null) } } />
            </td>
            <td className="item-priority">
              {
                ( (editItemId !== item.id ) &&
                  <p
                    className={ `priority-${item.priority}` }
                    onClick={ () => { setEditItemId(item.id) } }>
                      <span>{ priorities[item.priority] }</span>
                  </p>
                )
              }
              {
                ( (editItemId === item.id ) &&
                  <select
                    value={ item.priority }
                    onChange={ (e) => { item.priority = e.target.value; onEditItem(item); } }
                    onBlur={ () => { setEditItemId(null) } }>
                      <option
                        disabled="disabled"
                        value="undefined">
                        Priority...
                      </option>
                      {
                        priorities.map((item, index) => {
                          return (
                            <option key={ index } value={ index }>{ item }</option>
                          )
                        })
                      }
                  </select>
                )
              }
            </td>
              <td className="remove-button">
                <i
                  className="fas fa-times"
                  onClick={ () => { onRemoveItem(item.id) } }>
                </i>
              </td>
          </tr>
        )
      })
    )
  }

  return (
    <div className='list'>
      <table>
        <thead>
          <tr>
            <th>
              ITEM
              <i
                className="far fa-plus-square add-new-button"
                onClick={ () => { updateAddItemActive(true) } }>
              </i>
            </th>
            <th
              className="priority-toggle"
              onClick={ onToggleSort }>
              PRIORITY
                <i
                  className={`fas ${sort ? 'fa-sort-down' : 'fa-sort-up'} `}>
                </i>
            </th>
            <th className="clear-all-button">
              <i
                className="far fa-trash-alt"
                onClick={ onClearAll }></i>
            </th>
          </tr>
        </thead>

        <tbody>
          { addItemRow }
          { todoItemRows }
        </tbody>
      </table>
    </div>
  );
}

export default List;
