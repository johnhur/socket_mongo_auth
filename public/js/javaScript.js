$(function(){

var token, socket, $errMessage;

        function connect () {
          socket = io.connect("//test-app-sockets.herokuapp.com:80" + token ? ('?token=' + token) : '', {
            'forceNew': true
          });
          console.log(socket)

          socket.on('authenticated', function () {
            console.log('authenticated');
          }).on('disconnect', function () {
            console.log('disconnected');
          }).on('data', function(msg, info){
            var newLi = $('<li>').text(info + ": " +msg)
             $('#messages').prepend(newLi);
             newLi.fadeOut(15000, function() {

             })
             setTimeout(function(){
              (newLi.remove());}, 15000);
             })
          

          //SOCKET SOUND LISTENERS from SERVER! ********************
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

          socket.on('bongoDrumE', function(){
            $('#playBongo').attr('src', '../sounds/bonGo.mp3');
            $('#playBongo')[0].play();
            document.body.style.background = "purple";
          });

          socket.on('playStrings1R', function(){
            $('#playStrings').attr('src', '../sounds/elecStrings.mp3');
            $('#playStrings')[0].play();
          });

          socket.on('trumpR', function(){
            $('#playStrings').attr('src', '../sounds/hornsBe.mp3');
            $('#playStrings')[0].play();
          });

          //********* BASS EMITS/ONS *************

          socket.on('aDownR', function(){
            $('#beBassPlay').attr('src', "../sounds/keyA.mp3")
            $('#beBassPlay')[0].play();
          });

          socket.on('sDownR', function(){
            $('#sPlay').attr('src', "../sounds/keyS.mp3")
            $('#sPlay')[0].play();
          })

          socket.on('dDownR', function(){
            $('#dPlay').attr('src', "../sounds/keyD.mp3")
              $('#dPlay')[0].play();
          })

          socket.on('fDownR', function(){
            $('#fPlay').attr('src', "../sounds/keyF.mp3")
            $('#fPlay')[0].play();
          })

          //*****lead piano receivers*********

          socket.on('qDownR', function(){
            $('#qPlay').attr('src', "../sounds/keyQ.mp3")
            $('#qPlay')[0].play();
          })

          socket.on('wDownR', function(){
            $('#wPlay').attr('src', "../sounds/keyW.mp3")
            $('#wPlay')[0].play();
          })

          socket.on('eDownR', function(){
            $('#ePlay').attr('src', '../sounds/keyE.mp3')
            $('#ePlay')[0].play();
          })

          socket.on('rDownR', function(){
            $('#rPlay').attr('src', '../sounds/keyR.mp3')
            $('#rPlay')[0].play();
          })

          //***********percussion receivers**********
          socket.on('1DownR', function(){
            $('#1Play').attr('src', "../sounds/key1.mp3")
            $('#1Play')[0].play();
          })

          socket.on('2DownR', function(){
            $('#2Play').attr('src', "../sounds/key2.mp3")
            $('#2Play')[0].play();
          })

          socket.on('3DownR', function(){
            $('#3Play').attr('src', '../sounds/key3.mp3')
            $('#3Play')[0].play();
          })

          socket.on('4DownR', function(){
            $('#4Play').attr('src', '../sounds/key4.mp3')
            $('#4Play')[0].play();
          })

         };// this closes the connect function. 

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
                //$('#text').focus()

                $('#backingTrack').removeClass('hidden');
                $('#backingTrack').addClass('ui inverted segment');

                $('#leads').removeClass('hidden');
                $('#leads').addClass('ui inverted segment');  

                $('#bass').removeClass('hidden');
                $('#bass').addClass('ui inverted segment');  


                $('#melody').addClass('ui inverted segment');
                $('#harmony').addClass('ui inverted segment');
                $('#bass').addClass('ui inverted segment');
                // $('body').fadeIn(10000, function(){
                $('body').animate({backgroundColor:"#000000"},'slow');
                $('#info').html("Make music with anyone, from anywhere. Start playing by pressing any of the listed keys! Sounds will not play when typing a message.")
                // $('body').prepend().text('<h1>Welcome to jamOn</h1>');
                // });
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


//************** CLIENT SIDE KEY PRESS EVENT LISTENER SOCKET EMITS.. SOUNDS/ANIMATIONS ************** 
        // $('#elecBeat').on('click', function(){
        //   $('#elecBeatA').attr('src', "../sounds/elecBeat.mp3")
        //   $('#elecBeatA')[0].play();
        //   document.body.style.background = "black"
        //   socket.emit('beat#1');
        // });

        // $('#bongo').on('click', function(){
        //   $('#playBongo').attr('src', '../sounds/bonGo.mp3');
        //   $('#playBongo')[0].play();
        //   document.body.style.background = "purple"
        //   socket.emit('bongoDrum');
        // });

        $('#stringsPlay').on('click', function(){
          $('#playStrings').attr('src', '../sounds/elecStrings.mp3');
          $('#playStrings')[0].play();
          socket.emit('playStrings1');
        });

        $('#stringsPlay').on('click', function(){
          $('#playStrings').attr('src', '../sounds/elecStrings.mp3');
          $('#playStrings')[0].play();
          socket.emit('playStrings1');
        });

        $('#trumpets').on('click', function(){
          $('#playTrump').attr('src', '../sounds/hornsBe.mp3');
          $('#playTrump')[0].play();
          socket.emit('trump');
        });
                
        
          addEventListener("keydown", function(event) {
            if (event.keyCode == 86) {
              $('#mainAudio').attr('src', "../sounds/stringsPlay.mp3")
              $('#mainAudio')[0].play();
              document.body.style.background = "violet"
              socket.emit('vDown', {'keyCode': 86});
            };
          });

          //*********** EVENT LISTENERS FOR UPRIGHT BASS ***********

          addEventListener("keydown", function(event) {
            if (event.keyCode == 65) { // "a" = keycode 65 
              $('#beBassPlay').attr('src', "../sounds/keyA.mp3")
              $('#beBassPlay')[0].play();
              socket.emit('aDown');
            };
          });


          addEventListener("keydown", function(event) {
            if (event.keyCode == 83) { // "s" = keycode 83 
              $('#sPlay').attr('src', "../sounds/keyS.mp3")
              $('#sPlay')[0].play();
              socket.emit('sDown');
            };
          });

          addEventListener("keydown", function(event) {
            if (event.keyCode == 68) { // "d" = keycode 68 
              $('#dPlay').attr('src', "../sounds/keyD.mp3")
              $('#dPlay')[0].play();
              socket.emit('dDown');
            };
          });

          addEventListener("keydown", function(event) {
            if (event.keyCode == 70) { // "f" = keycode 70 
              $('#fPlay').attr('src', "../sounds/keyF.mp3")
              $('#fPlay')[0].play();
              socket.emit('fDown');
            }
          });  

          //*********** EVENT LISTENERS FOR keys ***********
          addEventListener("keydown", function(event) {
            if (event.keyCode == 81) { // "q" = keycode 81 
              $('#qPlay').attr('src', "../sounds/keyQ.mp3")
              $('#qPlay')[0].play();
              socket.emit('qDown');
            }
          }); 

          addEventListener("keydown", function(event) {
            if (event.keyCode == 87) { // "w" = keycode 87 
              $('#wPlay').attr('src', "../sounds/keyQ.mp3")
              $('#wPlay')[0].play();
              socket.emit('wDown');
            }
          });   

          addEventListener("keydown", function(event) {
            if (event.keyCode == 69) { // "e" = keycode 69 
              $('#ePlay').attr('src', "../sounds/keyE.mp3")
              $('#ePlay')[0].play();
              socket.emit('eDown');
            }
          });   

          addEventListener("keydown", function(event) {
            if (event.keyCode == 82) { // "r" = keycode 82 
              $('#rPlay').attr('src', "../sounds/keyR.mp3")
              $('#rPlay')[0].play();
              socket.emit('rDown');
            }
          });   

        //************ EVENT LISTENERS FOR PERCUSSION***********

          addEventListener("keydown", function(event) {
            if (event.keyCode == 49) { // 1 = 49
              $('#1Play').attr('src', "../sounds/key1.mp3")
              $('#1Play')[0].play();
              socket.emit('1Down');
            }
          }); 

          addEventListener("keydown", function(event) {
            if (event.keyCode == 50) { // 2 = 50
              $('#2Play').attr('src', "../sounds/key2.mp3")
              $('#2Play')[0].play();
              socket.emit('2Down');
            }
          });   

          addEventListener("keydown", function(event) {
            if (event.keyCode == 51) { // 3 = 51
              $('#3Play').attr('src', "../sounds/key3.mp3")
              $('#3Play')[0].play();
              socket.emit('3Down');
            }
          });   

          addEventListener("keydown", function(event) {
            if (event.keyCode == 52) { // 4 = 52
              $('#4Play').attr('src', "../sounds/key4.mp3")
              $('#4Play')[0].play();
              socket.emit('4Down');
            }
          });


 });  //this closes document onload. 
        

