import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar películas..."
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                    Buscar
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
