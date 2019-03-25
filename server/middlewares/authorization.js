const jwt = require('jsonwebtoken')

module.exports = ((req, res, next) => {
    let decoded = jwt.decode(req.headers.token)

    if (decoded.userFound.role !== 'admin') {
        res.status(403).json({
            message: 'user not authorized.'
        })
    } else {
        next()
    }
})