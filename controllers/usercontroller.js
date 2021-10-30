const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/create", async (req, res) => {
    try {
        const { username, password } = req.body.user;
        //encrypt user password here
        console.log(username, password); //test
        const salt = bcrypt.genSaltSync(12); //generating the salt
        console.log(salt); //test
        const pwHashed = bcrypt.hashSync(password, salt); // hashing the password
        console.log(pwHashed)//test
        const newUser = await User.create({ //await user creation
            username: username, //define username clearly
            password: pwHashed //define password as pwHashed 
        });
        console.log(newUser, User);
        res.status(200).json({
            message: "saved",
            user: newUser
        });
    } catch (err) {
        if (err) {
            res.status(500).json({
                message: `${err}`,
            });
        }
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body.user;

    try {
        const user = await User.findOne({
            where: {
                username,
            },
        });
        //compare our password to the DB password for the user
        const userAuth = bcrypt.compareSync(password, user.password); // "(password," calls into parameter in 36, "user.password)" refers to line 39 and stepping into the object
        console.log(userAuth);
        // depending on userAuth value 0/1 we proceed or throw
        //TODO generate jwt for the user and save it to database
        // const hashPassword = jwt.sign({})
        if (!userAuth) {
            res.status(401).json({
                message: "Invalid login"
            });
            return false;
        }
        let token = jwt.sign({id: User.id}, "i_am_secret", {expiresIn: 60 * 60 * 24});//
        res.status(200).json({
            username: user.username,
            message: "User successfully logged in!",
            user: User,
            sessionToken: token
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in"
        })
    }
});

module.exports = router;