{/* <form action="action_page.php">
  <div class="container">
    <h1>Register</h1>
    <p>Please fill in this form to create an account.</p>
    <hr>

    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" id="email" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" id="psw" required>

    <label for="psw-repeat"><b>Repeat Password</b></label>
    <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required>
    <hr>

    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>
    <button type="submit" class="registerbtn">Register</button>
  </div>

  <div class="container signin">
    <p>Already have an account? <a href="#">Sign in</a>.</p>
  </div>
</form>

 */}







//  router.post("/loginUser", async (req, res) => {
//   try {
//     const user = await User.findOne({
//       email: req.body.email,
//       password: req.body.password,
//     });
//     // console.log(user);
//     const token = await user.generateAuthToken();
//     // console.log(token);

//     res.send({ user, token });
//   } catch (err) {
//     res.status(400).send({
//       error: "Create user first",
//     });
//   }
// });





// <!DOCTYPE html>
// <html>
//   <head>
//     <title>Hello world</title>
//   </head>
//   <script src="/socket.io/socket.io.js"></script>
//   <script>

//     var socket = io();
   
//     socket.on("connectedRoom", function (data) {
//       document.body.innerHTML = " ";
//       document.write(data);
//     });

//     // socket.on('testerEvent', function(data){document.write(data.description)});
//   </script>
//   <body>
//     Hello world
//   </body>
// </html>
io.on("connection", function (socket) {  // jo variable hum function me use krneg vhi niche call ya fire krte time use karnenge 
  console.log("A user connected");
  
  socket.join('Room : ' + roomNo1);
  io.sockets.in('Room : ' + roomNo1).emit('connectedRoom',"You are connected to the Room no :"  + roomNo1);

  full++;
  if(full>= 2){
    full = 0;
    roomNo1 += 1;

    console.log(`Room is full please connect to the room no. ${roomNo1}.!`);
  }

  socket.on("disconnect", function () {
    console.log("A user disconnected");
  })

 });