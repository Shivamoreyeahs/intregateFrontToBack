 const express = require('express');
  const app = express();
// var app = require("express")();1
// var http = require("http").Server(app);
var http = require("http");

const server = http.Server(app);
var io = require("socket.io")(server);

const morgan = require("morgan");

const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected too MongoDB..."))
  .catch((err) => console.error(err));


const router = require("./routes/userSignUpRoutes");
const bodyParser = require('body-parser');
const { Server } = require('http');

app.use(morgan("tiny"));
console.log("Morgan was enabled...");

// app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true}));

// user register html file
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/public/userRegister.html')
})

 // user signIn html file
app.get('/signIn', (req,res)=>{
    res.sendFile(__dirname + '/public/admin.html')

})

// create Admin 
app.get('/adminSignUp',(req,res)=>{
  res.sendFile(__dirname + '/public/adminRegister.html')
})

//login Admin 
app.get('/adminSignIn',(req,res)=>{
  res.sendFile(__dirname + '/public/adminSign.html')
})



// io.on('connection', function(socket){
//   console.log('a user connected');

//   socket.emit("signIn", { message: " WelCome to the new User..." });


//   socket.on("disconnect", function () {
//     console.log("A user disconnected");
//     socket.broadcast.emit("signIn", {message:  " Users connected"});
//   });


// });

io.on('connection', function (socket) {
   console.log(socket.id); 
  console.log('a user connected');


   socket.emit('my other event', {description: "User is offline"});
    socket.on('disconnect', function () { 
      console.log('a user disconnected');
   });
  })


app.use("/",router);


const PORT = 3000;
server.listen(PORT, ()=> {
  console.log(`Connecting to ${PORT} ...`);
});
