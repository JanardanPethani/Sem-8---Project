const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
    // verify token
    try {
        const token = req.header('x-auth-token')
        // console.log(token);
        if (!token) {
            throw new Error('Authenticate first [no jwt found]')
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({ _id: decoded.user.id, 'tokens.token': token })

        if (!user) {
            throw new Error('Not registred/Authenticate first')
        }

        req.token = token
        req.user = user

        next()
    } catch (error) {
        // console.log(error);
        res.status(401).send({ errors: [{ msg: error.message }] })
    }
}

module.exports = auth