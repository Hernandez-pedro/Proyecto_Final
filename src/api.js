import axios from 'axios';

const API_KEY = 'ca25b362b9fb9e5d314097303f5e03e6';  // Reemplaza con tu clave API correcta
const BASE_URL = 'https://api.themoviedb.org/3';

// Función para buscar películas por query
export const fetchMovies = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                query
            }
        });
        return response.data.results;  // Devuelve los resultados de la búsqueda
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;  // Lanza el error para que pueda ser manejado por el componente que llama
    }
};

// Función para obtener detalles de una película por su ID
export const fetchMovieDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
            params: {
                api_key: API_KEY
            }
        });
        return response.data;  // Devuelve los detalles de la película
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;  // Lanza el error para que pueda ser manejado por el componente que llama
    }
};

// Función para obtener videos de una película por su ID
export const fetchMovieVideos = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
            params: {
                api_key: API_KEY
            }
        });
        return response.data.results;  // Devuelve los videos de la película
    } catch (error) {
        console.error("Error fetching movie videos:", error);
        throw error;  // Lanza el error para que pueda ser manejado por el componente que llama
    }
};

// Función para obtener películas recomendadas
export const fetchRecommendedMovies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
            params: {
                api_key: API_KEY
            }
        });
        return response.data.results;  // Devuelve las películas recomendadas
    } catch (error) {
        console.error("Error fetching recommended movies:", error);
        throw error;  // Lanza el error para que pueda ser manejado por el componente que llama
    }
};
