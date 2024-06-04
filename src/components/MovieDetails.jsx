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

    // Lista de servicios de streaming disponibles
    const streamingServices = [
        { name: 'Netflix', url: 'https://www.netflix.com' },
        { name: 'Disney+', url: 'https://www.disneyplus.com' },
        { name: 'Amazon Prime Video', url: 'https://www.primevideo.com' },
        { name: 'Claro Video', url: 'https://www.clarovideo.com' },
        { name: 'Star+', url: 'https://www.starplus.com' }
        // Puedes agregar más servicios de streaming aquí
    ];

    // Filtrar los servicios disponibles para la película actual
    const availableServices = streamingServices.filter(service => details?.streaming_platforms?.[service.name.toLowerCase()]);

    const handleVisitWebsite = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div>
            <h4>{details.title}</h4>
            <p>{details.overview}</p>
            <ul>
                <li><strong>Fecha de lanzamiento:</strong> {details.release_date}</li>
                <li><strong>Calificación:</strong> {details.vote_average}</li>
            </ul>
            {trailer && (
                <div className="embed-responsive embed-responsive-16by9 mb-3">
                    <iframe 
                        className="embed-responsive-item" 
                        src={`https://www.youtube.com/embed/${trailer.key}`} 
                        allowFullScreen 
                        title="Trailer"
                    ></iframe>
                </div>
            )}
            {availableServices.length > 0 ? (
                <div className="mb-3">
                    <h5>Disponible en:</h5>
                    <div>
                        {availableServices.map(service => (
                            <button 
                                key={service.name} 
                                className="btn btn-primary mr-2 mb-2" 
                                onClick={() => handleVisitWebsite(service.url)}
                            >
                                {service.name}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No hay servicios de streaming disponibles para esta película.</p>
            )}
            {details.homepage && (
                <div>
                    <h5>Ver la película:</h5>
                    <button 
                        className="btn btn-primary"
                        onClick={() => handleVisitWebsite(details.homepage)}
                    >
                        Ver
                    </button>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;
