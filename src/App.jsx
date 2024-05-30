import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import { fetchMovies, fetchRecommendedMovies } from './api';
import Swal from 'sweetalert2';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState('');

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

    return (
        <div className="content-container">
            <div className="home-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
            <div className="container">
                <h1 className="my-4">Buscador de Películas</h1>
                <SearchBar onSearch={handleSearch} />
                <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
                {selectedMovie && <MovieDetails movie={selectedMovie} />}
            </div>
        </div>
    );
};

export default App;
