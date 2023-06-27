var express = require("express");
var router = express.Router()
var dotenv = require('dotenv');
var jwt = require('jsonwebtoken');


dotenv.config();

// let PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`Server is up and running on ${PORT} ...`);
// });

// Main Code Here  //
// Generating JWT
router.post("/", (req, res) => {
    // Validate User Here
    const user = req.body.user;
    const password = req.body.password;
    // Then generate JWT Token

    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    let data = {
        user,
        password,
    }

    const token = jwt.sign(data, jwtSecretKey);

    res.send(token);
});

// Verification of JWT
router.get("/validateToken", (req, res) => {
    // Tokens are generally passed in header of request
    // Due to security reasons.

    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header(tokenHeaderKey);

        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(Error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});
module.exports = router;