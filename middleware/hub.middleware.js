module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {        
        const userID = req.headers.userid
        if (!userID) {
            return res.status(400).json({ message: 'Request error' })
        }
        req.userid = userID
        next()
    } catch (e) {
        res.status(400).json({ message: 'Error occured in hub middleware' })
    }
}