const router = require('express').Router();
const User = require('../model/User');
const {registerValidation} = require('../validation');
const bcrypt = require('bcryptjs');
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

//login
router.post('/login', async (res,req)=>{
    const { error } = loginValidation( req.body );

    if( error ) return res.status(400).send(error.details[0].message);

})

module.exports = router;

