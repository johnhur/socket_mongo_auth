$(function(){

var token, socket, $errMessage;

        function connect () {
          socket = io.connect(token ? ('?token=' + token) : '', {
            'forceNew': true
          });
          console.log(socket)

          socket.on('authenticated', function () {
            console.log('authenticated');
          }).on('disconnect', function () {
            console.log('disconnected');
          }).on('data', function(msg, info){
             $('#messages').prepend($('<li>').text(info + ": " +msg));
          });

          socket.on('vDownReceiver', function (){
            $('mainAudio').attr('src', "../sounds/stringsPlay.mp3")
            $('mainAudio').play();
            document.body.style.background = "violet"
          });

          socket.on('beat#1R', function(){
            $('#elecBeatA').attr('src', "../sounds/elecBeat.mp3")
            document.body.style.background = "black"
            $('#elecBeatA')[0].play();
          });



        }

        connect();

        $('#message').submit(function(e){
          e.preventDefault();
          var messageText = $("#text").val()
          console.log(messageText)
          socket.emit("message", messageText)
          $("#text").val("")
        })

        $('#login').submit(function (e) {
            e.preventDefault();
            var username = $('#username').val();
            var password = $('#password').val();
            var data = {user: {username: username, password:password}}
            $.ajax({
                type: 'POST',
                data: data,
                url: '/login'
            }).done(function (result) {
                if ($errMessage) $errMessage.remove()
                token = result.token;
                connect();
                $('#message').show();
                $('#login').hide();
                $('.signup').hide();
                $('#issue').hide();
                $('#text').focus()
                $('#backingTrack').removeClass('hidden');
                $('#backingTrack').addClass('ui inverted segment')
            }).fail(function(err){
              if ($errMessage) $errMessage.remove()
              $("#issue").removeClass("hidden");
              $("#issue").addClass("ui info message")
              $('#login')[0].reset();
            });
        });

        $('#login, #message').on("keydown", function(e){
        e.stopPropagation(); 
        })
        $('#login, #message').on("keyup", function(e){
        e.stopPropagation(); 
        })


        $('#elecBeat').on('click', function(){
          $('#elecBeatA').attr('src', "../sounds/elecBeat.mp3")
          $('#elecBeatA')[0].play();
          document.body.style.background = "black"
          socket.emit('beat#1');
        })

//************** CLIENT SIDE KEY PRESS EVENT LISTENER SOCKET EMITS.. SOUNDS/ANIMATIONS ************** 
        
          addEventListener("keydown", function(event) {
            if (event.keyCode == 86) {
              $('#mainAudio').attr('src', "../sounds/stringsPlay.mp3")
              $('#mainAudio')[0].play();
              document.body.style.background = "violet"
              socket.emit('vDown', {'keyCode': 86});
            };
          });


          
});
        

// $(function(){    

//      function connect () {
//           socket = io.connect(token ? ('?token=' + token) : '', {
//             'forceNew': true

//           });
//           console.log(socket)
//           socket.on('authenticated', function () {
//             console.log('authenticated');
//           }).on('disconnect', function () {
//             console.log('disconnected');
//           }).on('data', function(msg, info){
//              $('#messages').prepend($('<li>').text(info + ": " +msg));
//           });
//         }

//         connect();

//     $('form').submit(function(){
//       socket.emit('chat message', $('#m').val());
//       $('#m').val('');
//       return false;
//     });
//     socket.on('chat message', function(msg, user){
//       console.log("THIS IS THE SOCKET", user);
//       var newLi = ($('<li>').text(user + ": " + msg))
//       $('#messages').prepend(newLi);


//       // if (!localStorage.getItem("username")){
//       //   localStorage.setItem("username", user.email);
//       //   var userName = localStorage.getItem("username")
//       //   var newLi = ($('<li>').text(userName + ": " + msg))
//       //   $('#messages').prepend(newLi);
//       // } else {
//       // var userNameOG = localStorage.getItem("username")
//       // var newLi = ($('<li>').text(userNameOG + ": " + msg))
//       // $('#messages').prepend(newLi);
//       // newLi.fadeOut(5000, function() {
//       //   })
//       // setTimeout(function(){
//       //   (newLi.remove());
//       // }, 15000);
//       });
//     // });

//     // function setUsername () {
//     //   username = cleanInput($usernameInput.val().trim());

//     //   // If the username is valid
//     //   if (username) {
//     //     $loginPage.fadeOut();
//     //     $chatPage.show();
//     //     $loginPage.off('click');
//     //     $currentInput = $inputMessage.focus();

//     //     // Tell the server your username
//     //     socket.emit('add user', username);
//     //   }


// function playAnimate(soundPath, backGround, keyAction, keyNum) {
//   socket.on(keyAction + 'Receiver', function (){
//     $('#main').attr('src', soundPath)
//     $('#main')[0].play();
//     document.body.style.background = backGround
//   });

//   addEventListener("keydown", function(event) {
//     if (event.keyCode == keyNum) {
//       $('#main').attr('src', soundPath)
//       $('#main')[0].play();
//       document.body.style.background = backGround
//       socket.emit('keyAction', {'keyCode': keyNum});
//     };
//   });
// }

// playAnimate("../sounds/stringsPlay.mp3", "violet", "vDown", 86);
// playAnimate()

// function purpleBack() {
//   socket.on('vDownReceiver', function (){
//     $('#mainAudio').attr('src', "../sounds/stringsPlay.mp3")
//     $('#mainAudio')[0].play();
//     document.body.style.background = "violet"

//   });
  // socket.on('keyUpReceiver', function (){
  //   document.body.style.background = ""
  // });
  // addEventListener("keydown", function(event) {
  //   if (event.keyCode == 86) {
  //     $('#mainAudio').attr('src', "../sounds/stringsPlay.mp3")
  //     $('#mainAudio')[0].play();
  //     document.body.style.background = "violet"
  //     socket.emit('vDown', {'keyCode': 86});
  //   };
  // });
  // addEventListener("keyup", function(event) {
  //   if (event.keyCode == 86)
  //     document.body.style.background = "";
  //     socket.emit('keyUp', {});
  // });

// // purpleBack();

// function blueBack() {
//   addEventListener("keydown", function(event) {
//     if (event.keyCode == 66)
//       document.body.style.background = "blue";
//   });
//   addEventListener("keyup", function(event) {
//     if (event.keyCode == 66)
//       document.body.style.background = "";
//   });
// };
// blueBack();

// function dogBack() {
//   addEventListener("keydown", function(event) {
//     if (event.keyCode == 68)
//       document.body.style.backgroundImage = "url('https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRX1_u7_dAuwhcaw_h6I_DUSFLHByCzNYYVCLIR_1fT0KygadNF7w')";
//   });
//   addEventListener("keyup", function(event) {
//     if (event.keyCode == 68)
//       document.body.style.background = "";
//   });
// };
// dogBack();

// $("#elecBeatButton").on("click", function(){
//   $("#elecBeat")[0].play();
// })
// // $("#elecBeatButton").on("click", function(){
// //   $("#elecBeat")[0].pause();
// // })

// $('#m, #m1').on("keydown", function(e){
// e.stopPropagation(); 
// })
// $('#m, #m1').on("keyup", function(e){
// e.stopPropagation(); 
// })

// });  