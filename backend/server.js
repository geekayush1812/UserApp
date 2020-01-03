const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt=require('bcryptjs');
const mongoose = require('mongoose');
const userRoutes = express.Router();
const PORT = 4000;

let User = require('./user.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

userRoutes.route('/add').post(async function(req, res) {
    let Hpass=await bcrypt.hash(req.body.password,8)
    let obj={
        name:req.body.name,
        email:req.body.email,
        number:req.body.number,
        password:Hpass
    }
    let users = new User(obj);
    users.save()
        .then(user => {
            res.status(200).json({'User': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});

userRoutes.route('/update/:id').post(function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send('data is not found');
        else
            user.name = req.body.name;
            user.email = req.body.email;
            user.number = req.body.number;
            user.password = req.body.password;

            user.save().then( us => {
                res.json('user updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

userRoutes.route('/delete/:id').post(async function(req,res){
    const id=req.params.id
    try{
    const user=await User.findByIdAndDelete(id)
    console.log(user)
    res.send(user)
   }catch(e){
       console.log(e)
       res.status(404).send()
   }
})

app.use('/users', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});