import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {

    const movieId=props.movieId
    const userFrom=props.userFrom
    const movieTitle=props.movieInfo.title
    const moviePost=props.movieInfo.backdrop_path
    const movieRunTime=props.movieInfo.runtime

    
    const [Favorited, setFavorited] = useState(false)
    

    let variables = {
        userFrom: userFrom,
        movieId: movieId, 
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    console.log('초기값', FavoriteNumber)

    useEffect(()=>{

        //정보를 얻기 위해 Axios로 Server(DB)에 요청을 해야함.
        //얼마나 많은 사람이 Favorite button을 눌렀는지 정보를 얻어옴.
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response=> {
            setFavoriteNumber(response.data.favoriteNumber)
            if(response.data.success){
                //console.log(response.data)
            }else{
                alert('숫자 정보를 가져오는데 실패함.')
            }
        })

        //내가 이 영화를 이미 Favorite list에 넣었는지 아닌지 정보를 얻어옴.
        Axios.post('/api/favorite/favorited', variables)
        .then(response=> {
            if(response.data.success){
                //console.log('favorited', response.data)
                setFavorited(response.data.favorited)
            }else{
                alert('정보를 가져오는데 실패함.')
            }
        })
    }, [])


    const onClickFavorite=()=> {
        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response=> {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber - 1)
                    console.log('삭제', FavoriteNumber)
                    setFavorited(!Favorited)
                }else{
                    alert('Favorite List에서 삭제하기 실패')
                }
            })

        }else{
            Axios.post('/api/favorite/addToFavorite', variables)
            .then(response=> {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber + 1)
                    console.log('추가', FavoriteNumber)
                    setFavorited(!Favorited)
                }else{
                    alert('Favorite List에 추가하기 실패')
                }
            })
        }
    }

    return (
        <div>
            <Button type="primary" onClick={onClickFavorite}>{Favorited ? " Not Favorite " : " Add to Favorite "}{FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite

//DetailPage의 width도 수정해야함 margin안들어감?
//cast 사진 없는 것들 어떻게 처리????-> #8 질문 참고