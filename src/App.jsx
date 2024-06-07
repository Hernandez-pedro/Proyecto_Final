import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import { fetchMovies, fetchRecommendedMovies } from './api';
import Swal from 'sweetalert2';
import { Nav, Modal, Button } from 'react-bootstrap';
import './App.css'; // Importar el archivo CSS

const App = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [showCategories, setShowCategories] = useState(false);

    useEffect(() => {
        const getRecommendedMovies = async () => {
            try {
                const recommendedMovies = await fetchRecommendedMovies();
                setMovies(recommendedMovies);
                localStorage.setItem('movies', JSON.stringify(recommendedMovies));
            } catch (error) {
                Swal.fire('Error', 'No se pudieron cargar las películas recomendadas', 'error');
            }
        };

        const storedMovies = JSON.parse(localStorage.getItem('movies'));
        if (storedMovies) {
            setMovies(storedMovies);
        } else {
            getRecommendedMovies();
        }
    }, []);

    const handleSearch = async (query) => {
        try {
            const results = await fetchMovies(query);
            setMovies(results);
            localStorage.setItem('movies', JSON.stringify(results));
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar las películas', 'error');
        }
    };

    const handleSelectMovie = useCallback((movie) => {
        setSelectedMovie(movie);
        if (movie.backdrop_path) {
            setBackgroundImage(`https://image.tmdb.org/t/p/original${movie.backdrop_path}`);
        }
    }, []);

    const handleShowCategories = useCallback(() => setShowCategories(true), []);
    const handleCloseCategories = useCallback(() => setShowCategories(false), []);

    const handleCategoryClick = useCallback(async (category) => {
        try {
            const results = await fetchMovies(category);
            setMovies(results);
            setSelectedMovie(null);
            handleCloseCategories();
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar las películas de esta categoría', 'error');
        }
    }, [handleCloseCategories]);

    const handleTitleClick = useCallback(async () => {
        try {
            const recommendedMovies = await fetchRecommendedMovies();
            setMovies(recommendedMovies);
            localStorage.setItem('movies', JSON.stringify(recommendedMovies));
            setSelectedMovie(null);
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar las películas recomendadas', 'error');
        }
    }, []);

    return (
        <div className="content-container2">
            <div className="home-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="container">
                <h1 className="my-4" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
                    Películas
                </h1>

                <Nav className="justify-content-between">
                    <Nav.Item>
                        <Nav.Link onClick={handleShowCategories}>Categorías</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <SearchBar onSearch={handleSearch} />
                    </Nav.Item>
                </Nav>

                <MovieList movies={movies} onSelectMovie={handleSelectMovie} />

                <Modal show={showCategories} onHide={handleCloseCategories} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Categorías</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            <li>
                                <Button
                                    variant="link"
                                    onClick={() => handleCategoryClick('acción')}
                                    className="text-decoration-none category-button"
                                >
                                    Acción
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    onClick={() => handleCategoryClick('Animación')}
                                    className="text-decoration-none category-button"
                                >
                                    Animación
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    onClick={() => handleCategoryClick('comedia')}
                                    className="text-decoration-none category-button"
                                >
                                    Comedia
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    onClick={() => handleCategoryClick('Ciencia Ficción')}
                                    className="text-decoration-none category-button"
                                >
                                    Ciencia Ficción
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    onClick={() => handleCategoryClick('drama')}
                                    className="text-decoration-none category-button"
                                >
                                    Drama
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    onClick={() => handleCategoryClick('terror')}
                                    className="text-decoration-none category-button"
                                >
                                    Terror
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    onClick={() => handleCategoryClick('Romance')}
                                    className="text-decoration-none category-button"
                                >
                                    Romance
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    onClick={() => handleCategoryClick('Documentales')}
                                    className="text-decoration-none category-button"
                                >
                                    Documentales
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    onClick={() => handleCategoryClick('Fantasía')}
                                    className="text-decoration-none category-button"
                                >
                                    Fantasía
                                </Button>
                            </li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCategories}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>

                {selectedMovie && <MovieDetails movie={selectedMovie} />}
            </div>
        </div>
    );
};

export default App;
