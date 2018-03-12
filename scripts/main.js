var App = (function() {
    // create a bucket to store our ChatEngine Chat object
    let myChat;
    // create a bucket to store 
    let me;

  // this is our main function that starts our chat app
  const init = (chatEngine, person) => {
    // compile handlebars templates and store them for use later
    let peopleTemplate = Handlebars.compile($("#person-template").html());
    let meTemplate = Handlebars.compile($("#message-template").html());
    let userTemplate = Handlebars.compile($("#message-response-template").html());

    // connect to ChatEngine with our generated user
    // This step brings the client online in your global channel. 
    // You can think of it as being in the lobby. It requires that you provide a unique identifier for the client, 
    // an object that will be shared with all other clients to describe the user for this client and a token that 
    // will help PubNub determine the access privileges for this user.
    chatEngine.connect(person.uuid, person);

    // when ChatEngine is booted, it returns your new User as `data.me`
    // The connect call is asynchronous and fires a $.ready event when it successfully connects.
    chatEngine.on('$.ready', function(data) {
        // store my new user as `me`
        me = data.me;
        // create a new ChatEngine Chat
        myChat = new chatEngine.Chat('chatengine-medicalbot-1');
        // when we recieve messages in this chat, render them
        myChat.on('message', (message) => {
          // reply
          if(message.sender.uuid !== me.uuid) {
            var api_key = '826be22cb914f097743bce703763bf52'; // Get your API key at developer.betterdoctor.com
            var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=0&limit=50&user_key=' + api_key;
            var text = message.data.text;

            // if message is Hi or Hello or Howdy
            if (text.includes("Hi") || text.includes("Hello")) {
              _.delay(function() { 
                myChat.emit('message', {
                        text: 'Howdy!'
                    });
              }, 2000);
            }

            // if message contains "headache|stomach-ache|stomach-pain|dizzy|cough|cold|runny-nose"
            // then reply "Tell me more"
            if (text.includes("headache") || text.includes("pain") 
              || text.includes("stomach-pain") || text.includes("stomach-ache") 
              || text.includes("dizzy")  || text.includes("runny-nose") 
              || text.includes("cold")  || text.includes("cough")) {
              _.delay(function() { 
                myChat.emit('message', {
                        text: 'Tell me more!'
                    });
              }, 2000);
            }

            // if message contains "thats all I can think of"
            // reply let me find a nearby doctor who can help you
            if (text.includes("Thats all I can think of")) {
              _.delay(function() { 
                myChat.emit('message', {
                        text: 'Let me find a nearby doctor who can help you!'
                    });
              }, 2000);
            }

            //if message contains "Yes sure that would be great!"
            // reply with list of 5 doctors
            if (text === "Yes sure that would be great!") {
              $.get(resource_url, function (data) { 
                  var familyDoctors = _.filter(data.data, function(doctor) {
                    if (doctor.specialties && doctor.specialties.length != 0) {
                      if (doctor.specialties[0].hasOwnProperty('uid')) {
                        if (doctor.specialties[0].uid === 'family-practitioner') {
                          return true;
                        }
                      }
                    }
                    return false; 
                  });

                  _.delay(function() {
                    _.each(familyDoctors, function(familyDoctor) {
                    var address = familyDoctor.practices[0].visit_address.street
                    + " " + familyDoctor.practices[0].visit_address.city 
                    + " " + familyDoctor.practices[0].visit_address.state
                    + " " + familyDoctor.practices[0].visit_address.zip;
                    var res = familyDoctor.profile.title + " " + familyDoctor.profile.first_name + " " 
                      + familyDoctor.profile.last_name + " at " + address + ".";
                    myChat.emit('message', {
                        text: res
                    });    
                  }); 
                  }, 3000);            
              });
            }
            if (text.includes("thanks")) {
              _.delay(function() { 
                myChat.emit('message', {
                        text: 'It is my pleasure.'
                    });
              }, 2000);
            }
          }
          renderMessage(message);
        });
        // when a user comes online, render them in the online list
        myChat.on('$.online.*', (data) => {   
          $('#people-list ul').append(peopleTemplate(data.user));
        });
        // when a user goes offline, remove them from the online list
        myChat.on('$.offline.*', (data) => {
          $('#people-list ul').find('#' + data.user.uuid).remove();
        });
        // wait for our chat to be connected to the internet
        myChat.on('$.connected', () => {
            // search for 50 old `message` events (HISTORY)
          //   myChat.search({
          //     event: 'message',
          //     limit: 50
          //   }).on('message', (data) => {
          //     console.log(data)
          //     // when messages are returned, render them like normal messages
          //     renderMessage(data, true);
          // });
        });
        // bind our "send" button and return key to send message
        $('#sendMessage').on('submit', sendMessage)
    });
  };

  // send a message to the Chat
  const sendMessage = () => {

      // get the message text from the text input
      let message = $('#message-to-send').val().trim();

      // if the message isn't empty
      if (message.length) {

          // emit the `message` event to everyone in the Chat
          myChat.emit('message', {
            text: message
          });

          // clear out the text input
          $('#message-to-send').val('');
      }
      
      // stop form submit from bubbling
      return false;
  };

  // render messages in the list
  const renderMessage = (message, isHistory = false) => {
      // use the generic user template by default
      let template = Handlebars.compile($("#message-response-template").html());;

      // if I happened to send the message, use the special template for myself
      if (message.sender.uuid == me.uuid) {
        template = Handlebars.compile($("#message-template").html());;
      }

      let el = template({
        messageOutput: message.data.text,
        time: getCurrentTime(),
        user: message.sender.state
      });

      // render the message
      if(isHistory) {
        $('.chat-history ul').prepend(el); 
      } else {
        $('.chat-history ul').append(el); 
      }

      // scroll to the bottom of the chat
      scrollToBottom();
  };

  // scroll to the bottom of the window
  const scrollToBottom = () => {
    $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
  };

  // get the current time in a nice format
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
  };

  return {
    init: init
  };
}());