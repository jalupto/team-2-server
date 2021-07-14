const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let validateToken = require("../middleware/validate-token");


/*
========================================================================================================
REGISTER USER
========================================================================================================
*/

router.post("/register", async (req, res) => {

    let { email, password } = req.body.user;
    try{
        const User = await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 13),
        });

        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
    
        res.status(201).json({
            message: "User successfully registered",
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
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

/*
========================================================================================================
LOGIN USER
========================================================================================================
*/


router.post("/login", async (req, res) => {

    let { email, password } = req.body.user;
    try{   
        const loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
        });
        if (loginUser) {

            let passwordComparison = await bcrypt.compare(password, loginUser.password);

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

router.delete('/', validateToken, async(req, res) => {

    const userId = req.user.id;
    const userEmail = req.user.email
    console.log(userId);
    console.log(userEmail);
    try {
        const query = {
            where: {
                id: userId,
                email: userEmail
            },
        };

        await UserModel.destroy(query);
        res.status(200).json({
            message: `Account #${userId} corresponding with user ${userEmail} has been removed.`,
        
        })
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;