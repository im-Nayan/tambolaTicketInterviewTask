const jwt = require('jsonwebtoken');

exports.checkAuth = (req, res, next) => {
    console.log(req.cookie);
    if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken, 'USER_TOKEN_DATA', (err, data) => {
            // console.log(data);
            if (!err) {
                console.log('user token is verified');
                req.cookieData = data
                console.log(req.cookieData, "zzzzzzzzzzzzzzzzz");
                next();
            } else {
                console.log('user token is not verified', err);
                return res.status(400).send({ massage: "user token is not verified", status: 400 })
            }
        })
    } else {
        return res.status(400).send({ massage: "please provied token", status: 400 })
    }

}


// Token veryfy by header 
exports.authntication = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        res.status(400).json({
            message: "Token not found ",
        });
    } else {
        try {
            const payload = await jwt.verify(token, 'USER_TOKEN_DATA');
            req.user = payload;
            // console.log("req.user", req.user);
            console.log("tokenvalidation complete");
            next();
        } catch (err) {
            console.log('err', err)
            res.status(400).json({
                message: "Invalid Token",
            });
        }
        //it is going to give use the user id (user:{id: user.id})
    }
}