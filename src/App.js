import { useState } from 'react';
import './App.scss';
import Search from './components/Search/Search'
import List from './components/List/List'

function App() {
  const DEFAULT_LIST = [
    { id: 0, text: 'Call Mum', priority: 0 },
    { id: 1, text: 'Find a new job', priority: 2 },
    { id: 2, text: 'Go to the pub', priority: 1 }
  ];
  const PRIORITIES = ['Meh', 'Important', 'Life changing'];

  // On first load, either re-load list from local storage or load default list
  const local = JSON.parse(localStorage.getItem('todoList')) || [];
  const localList = local.length > 0 ? local : DEFAULT_LIST;
  // Calculate and set the highest id, it will be used to keep track of list items
  const highest = localList.reduce((max, item) => item.id >= max.id ? item : max).id;

  const [list,         setList] = useState(localList),
        [filteredList, setFilteredList] = useState(list),
        [nextUniqueId, setNextUniqueId] = useState(highest + 1),
        [searchQuery,  setSearchQuery] = useState(''),
        [currentSort,  setCurrentSort] = useState(true),
        [listIsEmpty,  setListIsEmpty] = useState(false);

  // Setters
  function updateList(newList) {
    setList(newList);

    filterBySearch(searchQuery, newList);
    setLocalStorage(newList);
    setListIsEmpty(newList.length === 0);
  }

  function setLocalStorage(list) {
    localStorage.setItem('todoList', JSON.stringify(list));
  }

  function incrementNextUniqueId() {
    setNextUniqueId(nextUniqueId + 1);
  }

  // Events
  function handleSearchChange(query) {
    setSearchQuery(query);
    filterBySearch(query, list);
  }

  function handleAddNewItem(newItem) {
    let newList = [ ...list ];
    newItem.id = nextUniqueId;
    incrementNextUniqueId();
    newList.push(newItem);
    updateList(newList);
  }

  function handleEditItem(item) {
    let newList = [ ...list ];
    let listItem = newList.findIndex(i => i.id === item.id);
    newList[listItem] = item;
    updateList(newList);
  }

  function handleRemoveItem(id) {
    let newList = [ ...list ];
    newList = newList.filter(item => item.id !== id);
    updateList(newList);
  }

  function handleClearAll() {
    if (confirm('This will delete all items in the list. Are you sure you want to continue?')){ // eslint-disable-line
      updateList([]);
    }
  }

  // Filtering
  function handleToggleSort() {
    setCurrentSort(!currentSort);
  }

  function filterBySearch(query, newList) {
    // Ensure query is not empty
    if (query === null || query === '') {
      setFilteredList(newList);
      return;
    }
    // Convert query to uppercase so we can ignore case when searching
    query = query.toUpperCase();
    setFilteredList(newList.filter( item => item.text.toUpperCase().match(query)));
  }

  return (
    <div id="App">
      <header className="header">
        <div>
          <h1>Todo</h1>
        </div>
      </header>
      <Search onSearchChange={ handleSearchChange }/>
      <List
        list={ filteredList }
        priorities={ PRIORITIES }
        sort={ currentSort }
        isEmpty={ listIsEmpty }
        onAddNewItem={ handleAddNewItem }
        onEditItem={ handleEditItem }
        onRemoveItem={ handleRemoveItem }
        onClearAll={ handleClearAll }
        onToggleSort={ handleToggleSort }
      />
    </div>
  );
}

export default App;
