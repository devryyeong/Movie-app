const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

//express에서 제공하는 router를 사용하므로 '/api/favorite'을 index.js에 써줌
router.post('/favoriteNumber', (req, res)=> { //콜백함수로!
     //req.body.movieId: request를 bodyParser의 body를 이용해서 movieId를 가져올 수 있음.
    //1. mongoDB에서 favorite숫자 가져오기
    //server/models의 movieId와 프론트가 보내준 movieId가 같은 것을 찾아주는 메소드 find() 사용.
    Favorite.find({"movieId" : req.body.movieId})
    .exec((err, info)=> { //info: [1,2,3] 형식.
        if(err) return res.status(400).send(err) //err나면 statue(400)으로 client에게 send(err)

        //2. 가져온다음 프론트에 다시 숫자 정보 보내주기
        res.status(200).json({ success:true, favoriteNumber: info.length})
    })
})

module.exports = router;
