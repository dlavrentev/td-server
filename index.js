require("dotenv").config();
const { response } = require('express');
const express = require('express');
const app = express()
const port = process.env.PORT || 4000;
app.use(express.json());
const shortid = require('shortid');
const Travels = require('./dbHelpers')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const bcrypt = require('bcryptjs')
const cors = require('cors');
app.use(cors({origin:'*'}))


// Import Routers

const usersRouter = require('./routes/user-routes')
const destinationRouter=require('./routes/destination-routes')

// Active (use) the routes

app.use('/',usersRouter)
app.use('/',destinationRouter)

// Welcome page

app.get('/',(req, res)=>{
    res.status(200).json({message:"Hi World"})
})



app.listen(port,()=>{
    console.log(`My server is running at port ${port}`)
})
