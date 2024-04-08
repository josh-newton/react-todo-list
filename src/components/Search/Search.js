import { useState } from 'react';
import './Search.scss';

function Search({ onSearchChange }) {
  const [query, setQuery] = useState('');

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    onSearchChange(value);
  }

  return (
    <div className='search'>
      <div>
        <label>
          <i className="fas fa-search"></i>
          <input
            value={ query }
            type="text"
            onChange={ handleChange }
            placeholder="Search..." />
        </label>
      </div>
    </div>
  );
}

export default Search;
