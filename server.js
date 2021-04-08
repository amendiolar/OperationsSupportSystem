
const express =  require('express');
//const {MongoClient} = require('mongodb');
const { connect} = require('./db');
const {findAll, create} = require('./services/userServices')
const app = express();
const {MONGODB_ADMIN} =require('./config')
const {MONGODB_USER} =require('./config')

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/users',async(req,res) => {
    // regresar todos los users
    try{
        const users = await findAll()
        return res.status(200).send(users)
    }catch(error){
        return res.status(400).send(error)
    }
});

app.post('/users', async(req,res) => {
    //crear un nuevo user
    try{
        const user = await create(req.body)
        //createBulk y se cambia la ruta con /users/Bulk
        return res.status(201).send(user)
    }catch(error){
        console.log(error)
        return res.status(400).send(error)
    }


});

connect(MONGODB_ADMIN,function(error){
    if(error){
        console.log("Unable to conect to mongo");
        process.exit(1) // termina con el server
    }else{
        console.log('conneted to database')
        app.listen(3000,() =>{
            console.log("Server ready!! 🚀");
        })
    }

})