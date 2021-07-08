if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod'); //deploy 이후 production모드
} else {
    module.exports = require('./dev'); //local 환경에서
}