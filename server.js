const express = require('express');
const connectDB = require('./src/configs/database.config');
const mongoose = require('mongoose');
const User = require('./src/modules/users/user.model');
require('dotenv').config();

const app = express();
connectDB();

mongoose.connection.once('open' , () => {
    console.log("Connect to MongoDB");
    app.listen(8080 , () => {
        console.log("connect to 8080");
    });
})

// const run = async () => {
//     try{
//         const user1 = await User.deleteMany({
//             name: "minh hieu",
//             // age: 15,
//             // password: "Minh"
//         })
//         console.log(user1);
//     } catch(e){
//         console.log(e.message);
//     }
// }

// run();

// const user1 = new User({name:"minh hieu " , age:15});
// user1.save()
//     .then(() => console.log("Used Saved"))
//     .catch((err) => console.error(err));

// console.log(user1);