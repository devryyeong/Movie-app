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

router.post('/favorited', (req, res)=> { 
    //내가(userFrom) 이 영화를 이미 Favorite list에 넣었는지 아닌지 정보를 얻어옴.
    Favorite.find({"movieId" : req.body.movieId, "userFrom": req.body.userFrom})
    .exec((err, info)=> {
        if(err) return res.status(400).send(err)

        let result=false; //favorite 안누름.
        if(info.length!==0){
            result=true //favorite 누름.
        }
        res.status(200).json({ success:true, favorited: result})
    })
})


router.post('/removeFromFavorite', (req, res)=> { 
    //DB에 넣은 정보들을 지워줌.
    Favorite.findOneAndDelete({ moveId: req.body.movieId, userFrom: req.body.userFrom})
    .exec((err, doc)=> {
        if(err) return res.status(400).send(err)
        res.status(200).json({ success: true, doc})
    })
})

router.post('/addToFavorite', (req, res)=> { 
    //req.body로 받아와서 Favorite DB에 넣어줘야 함.
    //어떻게? document instance를 생성해서 넣어줘야 함. favorite document에 variables의 모든 정보들이 다 들어감
    const favorite = new Favorite(req.body)

    favorite.save((err, doc)=> {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true})
    }) 
})


router.post('/getFavoredMovie', (req, res)=> { 

    Favorite.find({ 'userFrom': req.body.userFrom})
    .exec((err, favorites)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true, favorites})
    })


})


router.post('/removeFromFavorite', (req, res)=>{
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom})
    .exec((err, result)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })
})


module.exports = router;