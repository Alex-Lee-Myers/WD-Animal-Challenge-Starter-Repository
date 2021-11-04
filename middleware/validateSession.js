const jwt = require("jsonwebtoken");
const { User } = require("../models");

const validateJWT = async (req, res, next) => {
    if (req.method == "OPTIONS") {
        next();
    } else if (
        req.headers.authorization &&
        req.headers.authorization.includes("Bearer")
    ) {
        const { authorization } = req.headers;
        console.log("authorization -->", authorization);
        const result = authorization.includes("Bearer") ? authorization.split(" ")[1] : authorization
        console.log(result)
        //this console log works
        const payload = authorization ? jwt.verify( //failing starts here
                result,
                process.env.JWT_SECRET
            )
            : undefined;

        console.log("payload.id -->", payload.id); // doesnt get to this console log

        if (payload) {
            let foundUser = await User.findOne({ where: { id: payload.id } }); //"property id does not exist"
            console.log("foundUser -->", foundUser);

            if (foundUser) {
                console.log("request -->", req);
                req.user = foundUser;
                next(); // this sort of acts like "return: false" to exit out of the loop on success, but using a middleware function instead
            } else {
                res.status(400).send({ message: "Not Authorized" });
            }
        } else {
            res.status(401).send({ message: "Invalid token" });
        }
    } else {
        res.status(403).send({ message: "Forbidden" });
    }
};

module.exports = validateJWT;