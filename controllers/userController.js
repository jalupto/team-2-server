const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueContraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {

    let { username, email, password } = req.body.user;
    try{
        const User = await UserModel.create({
            username,
            email,
            password: bcrypt.hashSync(passwordhash, 13),
        });

        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
    
        res.status(201).json({
            message: "User successfully registered",
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueContraintError) {
            res.status(409).json({
                message: "Email or username already in use",
            });
        } else {
            res.status(500).json({
                message: "Failed to register user",
            });
        }
    }
    
});

router.post("/login", async (req, res) => {

    let { email, password } = req.body.user;
    try{   
        const loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
         });
         if (loginUser) {

            let passwordComparison = await bcrypt.compare(passwordhash, loginUser.passwordhash);

            if (passwordComparison) {

            let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60* 24});

            res.status(200).json({
                message: "User successfully logged in!",
                user: loginUser,
                sessionToken: token
            });
        } else {
            res.status(401).json({
                message: "Login failed",
            });
        }
    } else {
        res.status(401).json({
            message: "Incorrect username or password"
        });
    }
    } catch (err) {
        
            res.status(500).json({
                message: "Failed to login user",
            });
        
        
        }
    
});



/*
========================================================================================================
DELETE USER
========================================================================================================
*/

router.delete('/user/:id', async(req, res) => {
    const userId = req.user.id;

    try {
        const query = {
            where: {
                id: userId
            }
        };

        await UserModel.destroy(query);
        res.status(200).json({ message: 'Account has been removed.' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;