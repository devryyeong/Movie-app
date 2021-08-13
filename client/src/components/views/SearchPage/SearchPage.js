import React, { useEffect, useState } from 'react'
import './search.css';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';

function SearchPage() {
    const [SearchTerm, setSearchTerm] = useState('')
    const [Movies, setMovies] = useState([])

    const fetchMovies=(endpoint)=>{
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            setMovies(response.results)
            
        })
    }

    const onSubmitHandler=(e)=>{
        e.preventDefault();

        if(SearchTerm){
            const endpoint=`${API_URL}search/movie?api_key=${API_KEY}&query=`;
            fetchMovies(endpoint + SearchTerm)
            setSearchTerm('')
        }
    };

    const onChangeHandler=(e)=>{
        setSearchTerm(e.target.value);
    }


    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <h2> Search Movies </h2>
            <hr />

            <header>
                <form onSubmit={onSubmitHandler}>
                    <input className="search" type="search" placeholder="Search" 
                    value={SearchTerm} onChange={onChangeHandler}/>
                </form>
            </header>
            
            <div>
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
        </div>
    )
}

export default SearchPage
