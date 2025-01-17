        const router = require('express').Router();
        const User = require('../model/User');
        const {registerValidation, loginValidation} = require('../validation');
        const bcrypt = require('bcryptjs');
        const jwt = require('jsonwebtoken');


        /**
         * Route and Registration logic.
         *
         * @param req
         * @param res
         * 
         */
        router.post('/register', async (req, res)=>{
        
            const { error } = registerValidation( req.body );

            if( error ) return res.status(400).send(error.details[0].message);

            //checking if the user is already in the database.
            const emailExist = await User.findOne({email: req.body.email});
            if( emailExist ) return res.status(400).send('Email already exist !!!');
            
            //Hash Password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password,salt);
            
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            });

            try {
                const savedUser = await user.save();
                res.send( { user:user.id } );
            } catch (error) {
                console.log('Saved User ERROR', error);
                res.status(400).send(error);
            }

        })

        /**
         * Route and Login logic.
         *
         * @param req
         * @param res
         * 
         */
        router.post('/login', async (req,res)=>{
            
            const { error } = loginValidation( req.body );

            if( error ) return res.status(400).send(error.details[0].message);
            //checking if the email exist.
            const user = await User.findOne({email: req.body.email});
            if( !user ) return res.status(400).send('Email is not found');
            //Password is correct
            const validPass = await bcrypt.compare( req.body.password, user.password );
            if( !validPass) return res.status(400).send('Invalid password');

            //create and assign token
            const token = jwt.sign({ _id:user._id }, process.env.TOKEN_SECRET);
            res.header('auth-token', token).send(token);
            //res.send('Logged in!');
        })

        module.exports = router;

