
const express = require('express');
const router = express.Router();
const Travels = require('../dbHelpers')
const bcrypt = require('bcryptjs')




 // GET ALL USERS
router.get('/users',(req,res)=>{
    Travels.getAllUsers()
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(error=>res.status(500).json(error))
})


//CREATE A NEW USER
router.post('/users/register',(req,res)=>{
  const credentials = req.body;
  
  if(!(credentials.username && credentials.password)){
    return res.status(400).json({message:"username and password required"})
  } 

 const hash = bcrypt.hashSync(credentials.password,12)
 credentials.password = hash;

   Travels.addUser(credentials)
   .then(user=>{
       res.status(200).json(user)
   })
   .catch(error=>{
       if(error.errno===19){
           res.status(400).json({message:"Username already exists"})
       }else {
          res.status(500).json(error)
       }
   })
    
})


// GET A USER BY USERNAME
router.get('/users/username/:username',(req,res)=>{
// const username = req.params.username
 const {username} = req.params
 Travels.findUserByUsername(username)
 .then(user=>{
     res.status(200).json(user)
 })
 .catch(error=>res.status(500).json(error))
})


router.get('/users/userId/:id',(req,res)=>{
    // const username = req.params.username
     const {id} = req.params
     Travels.findUserByUserId(id)
     .then(user=>{
         res.status(200).json(user)
     })
     .catch(error=>res.status(500).json(error))
    })

// DELETE A USER

router.delete('/users/username/:id',(req,res)=>{
    // const id = req.params.id
    const {id}=req.params
    Travels.removeUser(id)
    .then(count=>{
        if(count>0){
            res.status(200).json({message:"User is deleted"})
        }else{
            res.status(404).json({message:"No user with that id"})
        }
    })
    .catch(error=>res.status(500).json(error))
})




// LOGIN WITH AN EXISTING USER

 router.post('/users/login',(req,res)=>{

    // const username = req.body.username
    // const password = req.body.password
   const {username,password} = req.body
  
   Travels.findUserByUsername(username,password)
   .then(user=>{
       if(user && bcrypt.compareSync(password,user.password)){
           res.status(200).json(user)
       } else {
           res.status(400).json({message:"User with that password does not exist."})
       }
   })
   .catch(error=>res.status(500).json(error))
 })

 //JOINS

 router.get('/users/:id/destinations',(req,res)=>{
     const {id}=req.params;
     Travels.getUserDestinations(id)
     .then(destinations=>{
        res.status(200).json(destinations)
     })
     .catch(error=>res.status(500).json(error))
 })

 module.exports = router;
