import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import { fetchMovies, fetchRecommendedMovies } from './api';
import Swal from 'sweetalert2';
import { Nav, Modal, Button } from 'react-bootstrap';

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

    const handleSelectMovie = (movie) => {
        setSelectedMovie(movie);
        if (movie.backdrop_path) {
            setBackgroundImage(`https://image.tmdb.org/t/p/original${movie.backdrop_path}`);
        }
    };

    const handleShowCategories = () => setShowCategories(true);
    const handleCloseCategories = () => setShowCategories(false);

    const handleCategoryClick = async (category) => {
        try {
            const results = await fetchMovies(category);
            setMovies(results);
            setSelectedMovie(null);
            handleCloseCategories();
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar las películas de esta categoría', 'error');
        }
    };

    const handleTitleClick = async () => {
        try {
            const recommendedMovies = await fetchRecommendedMovies();
            setMovies(recommendedMovies);
            localStorage.setItem('movies', JSON.stringify(recommendedMovies));
            setSelectedMovie(null);
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar las películas recomendadas', 'error');
        }
    };

    return (
        <div className="content-container">
            <div className="home-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="container">
                <h1 className="my-4" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
                    Películas
                </h1>

                {/* Barra de Navegación */}
                <Nav className="justify-content-between">
                    <Nav.Item>
                        <Nav.Link onClick={handleShowCategories}>Categorías</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <SearchBar onSearch={handleSearch} />
                    </Nav.Item>
                </Nav>

                {/* Lista de películas */}
                <MovieList movies={movies} onSelectMovie={handleSelectMovie} />

                {/* Modal de Categorías */}
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
                                    className="text-decoration-none"
                                >
                                    Acción
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    onClick={() => handleCategoryClick('comedia')}
                                    className="text-decoration-none"
                                >
                                    Comedia
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    onClick={() => handleCategoryClick('drama')}
                                    className="text-decoration-none"
                                >
                                    Drama
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    onClick={() => handleCategoryClick('terror')}
                                    className="text-decoration-none"
                                >
                                    Terror
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    onClick={() => handleCategoryClick('Romance')}
                                    className="text-decoration-none"
                                >
                                    Romance
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    onClick={() => handleCategoryClick('Belico')}
                                    className="text-decoration-none"
                                >
                                    Belico
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

                {/* Detalles de la película seleccionada */}
                {selectedMovie && <MovieDetails movie={selectedMovie} />}
            </div>
        </div>
    );
};

export default App;
