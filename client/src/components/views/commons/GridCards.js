//Grid 스타일을 다른 페이지에서도 쓸 수 있도록 commons 폴더에 따로!
import React from 'react'
import { Col } from 'antd';
import styled from 'styled-components';
import './GridCards.css';

const Styled={
    wrap: styled.div`
        background-color: #bfecff
    `
};

function GridCards(props) {

    if(props.landingPage){
        return (
            //한 칼럼에 24라서 4개씩 넣으려면 6
            <Col lg={6} md={8} sm={12} xs={24}>
                
                <div className="movie">
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.movieName} />
                    </a>

                    <Styled.wrap>
                        <h4>{props.movieTitle}</h4>
                        <div>{props.voteAverage}</div>
                    </Styled.wrap>

                    <div className="movie-over">
                        <h2>Overview</h2>
                        <p>{props.movieOverview}</p>
                    </div>
                </div>
                
            </Col>
            
        )
    } else{
        return (
            <Col md={8} sm={12} xs={24}>
                <div style={{ position: 'relative'}}>
                    <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.characterName} />
                </div>
            </Col>
        )
    }
    
}

export default GridCards
