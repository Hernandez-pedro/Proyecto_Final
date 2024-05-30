import React, { useEffect, useState } from 'react';
import { fetchMovieDetails, fetchMovieVideos } from '../api';
import Swal from 'sweetalert2';

const MovieDetails = ({ movie }) => {
    const [details, setDetails] = useState(null);
    const [trailer, setTrailer] = useState(null);

    useEffect(() => {
        const getDetails = async () => {
            try {
                const data = await fetchMovieDetails(movie.id);
                setDetails(data);

                const videos = await fetchMovieVideos(movie.id);
                const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                setTrailer(trailer);
            } catch (error) {
                Swal.fire('Error', 'No se pudieron cargar los detalles de la película', 'error');
            }
        };
        getDetails();
    }, [movie]);

    if (!details) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h4>{details.title}</h4>
            <p>{details.overview}</p>
            <ul>
                <li><strong>Fecha de lanzamiento:</strong> {details.release_date}</li>
                <li><strong>Calificación:</strong> {details.vote_average}</li>
            </ul>
            {trailer && (
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe 
                        className="embed-responsive-item" 
                        src={`https://www.youtube.com/embed/${trailer.key}`} 
                        allowFullScreen 
                        title="Trailer"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;
