import React, {useEffect, useState} from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../../views/LandingPage/Sections/MainImage'

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])



    useEffect(() => {

        let endpointCrew=`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo=`${API_URL}movie/${movieId}?api_key=${API_KEY}`

        //console.log(props.match)
        fetch(endpointInfo)
        .then(response => response.json())
        .then (response => {
            console.log(response)

            setMovie(response)
        })
    }, [])



    return (
        <div>
            {/*Header*/}
            {/*Main Image*/}
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            


            {/*Body*/}
            <div style={{width: '75%', margin: '1rem auto'}}></div>

            {/* Movie Info */}



            <br/>
            {/* Actor Grid */}

            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                <button> Toggle Actor View</button>
            </div>

        </div>
    )
}

export default MovieDetail
