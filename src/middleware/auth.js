const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        // console.log(token);
        if (!token) {
            throw new Error(token)
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error(user)
        }

        req.token = token
        req.user = user

        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' + e })
    }
}

module.exports = auth