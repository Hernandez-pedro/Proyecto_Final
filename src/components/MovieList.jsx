import React, { useState } from 'react';
import MovieDetails from './MovieDetails';
import { Modal } from 'react-bootstrap';

const MovieList = ({ movies }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleClose = () => setSelectedMovie(null);
    const handleShow = (movie) => setSelectedMovie(movie);

    return (
        <>
            <div className="row">
                {movies.map((movie) => (
                    <div key={movie.id} className="col-md-3 mb-4">
                        <div className="card" onClick={() => handleShow(movie)}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal show={selectedMovie !== null} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedMovie?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedMovie && <MovieDetails movie={selectedMovie} />}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>Cerrar</button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MovieList;
