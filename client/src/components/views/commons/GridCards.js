import React from 'react'
import { Col } from 'antd';

function GridCards(props) {
    return (
        //한 칼럼에 24라서 4개씩 넣으려면 6
        <Col lg={6} md={8} xs={24}>
            <div style={{ posiotion: 'relative'}}>
                <a href={`/movie/${props.movieId}`}>
                    <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.movieName} />
                </a>
            </div>
        </Col>
    )
}

export default GridCards
