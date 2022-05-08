const express = require('express') ;
const routes = express.Router()
const usercontroller = require('../controller/UserController');

routes.post('/signup' , usercontroller.createUser);


routes.post('/signin' , usercontroller.signin);
routes.get('/profile' , usercontroller.requiresSiginningIn , (req,res) => {
    res.status(200).json(
        {
            message : 'Welcome to your profile'
        }
    )
});

module.exports  = routes ;