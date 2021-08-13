import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row, Button } from 'antd';


function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(()=> {
        const endpoint=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint) //로드되자마자 20개 가져와야함
        
    }, []) //dependency(deps) parameter 생략->컴포넌트가 리렌더링될 때마다 한번씩만 호출됨.



    const fetchMovies=(endpoint)=>{
        //API를 사용하여 백엔드 서버와 비동기 요청
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            //If you already have props as an object, and you want to pass it in JSX, 
            //you can use ... as a "spread" operator to pass the whole props object.
            setMovies([...Movies, ...response.results]) //원래 페이지는 유지하고 덧붙혀나가는 방식
            setMainMovieImage(response.results[0])
            setCurrentPage(response.page)
            
        })
    }

    const loadMoreItems=()=> {
        const endpoint=`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`;
        fetchMovies(endpoint)
    }



    return (
        
        <div style={{ width: '100%', margin: '0'}}>

            {/*Main Image*/}
            {MainMovieImage && 
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }

            <div style={{ width: '80%', margin: '1rem auto'}}>

                <h2>Movies by latest</h2>
                <hr/>


                {/*Movie Grid Cards*/}
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index)=>(
                        <React.Fragment key={index}>
                            
                            <GridCards
                            landingPage
                            image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                            movieId={movie.id}
                            movieName={movie.original_title}
                            movieTitle={movie.title}
                            voteAverage={movie.vote_average}
                            movieOverview={movie.overview}
                            />
                            
                        </React.Fragment>
                        
                    ))}
                </Row>
            </div>


            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="dashed" onClick={loadMoreItems}> LOAD MORE</Button>
            </div>
        </div>
    )
}

export default LandingPage