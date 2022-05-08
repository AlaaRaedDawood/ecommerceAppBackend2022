const users = require('../models/users');
const jwt = require('jsonwebtoken');
module.exports = { 
    async createUser (req,res){
        try {
            const {
                firstName , 
                lastName , 
                email ,
                password
            } = req.body ;
            var user = await users.findOne({email});
            if(user){
                return res.status(400).json({
                    message : 'Admin alraedy exist please sign in'
                })
            }
            const userResponse = await users.create({
                firstName , 
                lastName , 
                email ,
                password ,
                role: 'admin' ,
                username : Math.random().toString()
            })
          if(userResponse){
            return res.status(200).json({
                message : 'Admin created' ,
                data: userResponse
            })
          }else{
            return res.status(400).json({
                message : 'Error occured'
            })
          }
        }
        catch(error){
            console.log(`Error while Registering new admin :  ${error}`)
        }
       
    },
    async signin (req,res){
        try {
            const {
                email ,
                password
            } = req.body ;
            var user = await users.findOne({email});
            if(user && user.role == 'admin'){
                //check password 
                user.authenticate(password).then(result =>{
                if(result){
                    //create a token for user
                    const token = jwt.sign({id : user._id} , 'secret', { expiresIn: '1h' }) 
                    return res.status(200).json({
                        
                       data: user ,
                       token
                    })
                }else{
                    return res.status(400).json({
                        message : 'Wrong Password'
                    })}
                });
               
            }else{
                return res.status(400).json({
                    message : 'Admin doesnot exist please siginup'
                })
            }
           
        }
        catch(error){
            console.log(`Error while siginning in:  ${error}`)
        }
       
    },
    async requiresSiginningIn(req,res,next){
        try{
            const token  = req.headers.authorization.split(" ")[1]
            const user = jwt.verify(token,'secret');
            console.log(user);
                req.user = user 
                next();
           
        }catch(error){
            console.log(`Error occured:  ${error}`)
            res.status(400).json({
                error :
                'errorrr occurred'
            })
        }
        
        
    }

}