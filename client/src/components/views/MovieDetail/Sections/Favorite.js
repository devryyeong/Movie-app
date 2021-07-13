import React, {useEffect} from 'react';
import Axios from 'axios';

function Favorite(props) {

    const movieId=props.movieId
    const userFrom=props.userFrom
    const movieTitle=props.movieInfo.title
    const moviePost=props.movieInfo.backdrop_path
    const movieRunTime=props.movieInfo.runtime

    useEffect(()=>{

        let variables = {
            userFrom,
            movieId
        }

        //정보를 얻기 위해 Axios로 Server(DB)에 요청을 해야함.
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response=> {
            if(response.data.success){
                console.log(response.data)
            }else{
                alert('숫자 정보를 가져오는데 실패함.')
            }
        })
    }, [])


    return (
        <div>
            <button>Favorite</button>
        </div>
    )
}

export default Favorite
