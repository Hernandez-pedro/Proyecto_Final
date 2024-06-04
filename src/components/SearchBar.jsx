import React, { useState } from 'react';
import './SearchBar.css';
import { Modal, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        if (query.trim() === '') {
            setShowAlert(true);
            return;
        }
        onSearch(query);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleCloseAlert = () => setShowAlert(false);

    return (
        <>
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
                    <button className="btn btn-outline-secondary btn-search" type="button" onClick={handleSearch}>
                        Buscar
                    </button>
                </div>
            </div>

            {/* Alerta Modal */}
            <Modal show={showAlert} onHide={handleCloseAlert} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Alerta</Modal.Title>
                </Modal.Header>
                <Modal.Body>Por favor, ingresa un término de búsqueda.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAlert}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SearchBar;
