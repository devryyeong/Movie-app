import React, {useEffect, useState} from 'react';
import { Row } from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../../views/LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite'

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

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

        fetch(endpointCrew)
        .then(response => response.json())
        .then (response => {
            console.log('responseForCrew', response)
            setCasts(response.cast)
        })
    }, [])

    const toggleActorView=() => {
        setActorToggle(!ActorToggle)
    }


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
            
            <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                {/* 3가지 props를 넣어줘야 함. */}
                {/* loginPage에서 userId정보를 localstorage에 저장하므로 그 정보를 가져오기 위해 getItem() */}
                <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
            </div>

            {/* Movie Info */}
        <MovieInfo 
            movie={Movie}
        />


            <br/>
            {/* Actor Grid */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                <button onClick={toggleActorView}> Toggle Actor View</button>
            </div>

            {ActorToggle &&
                <Row gutter={[16, 16]}>

                {Casts && Casts.map((cast, index)=>(
                    <React.Fragment key={index}>
                        <GridCards
                        image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                        characterName={cast.name}
                        />
                    </React.Fragment>
                ))}
            </Row>
            }

        </div>
    )
}

export default MovieDetail
