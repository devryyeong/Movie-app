const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: { //누가 이 영화를 좋아했는가?
        type: Schema.Types.ObjectId, //ObjectId로 user의 모든 정보들을 가져올 수 있음.
        ref: 'User' //reference
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: { 
        type: String
    },
    movieRunTime: { 
        type: String
    }
}, {timestamps: true})

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }