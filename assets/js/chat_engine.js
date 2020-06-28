// wheenever we are firing anevent we are emitting and when we are received that fired event then it is on
class ChatEngine{

    constructor(chatBoxId,userEmail){

        this.chatBox=$(`#${chatBoxId}`);

        this.userEmail=userEmail;

        // this io is a global variable which is given by io cdn script file which we have imported  
       // this will sent e req to server to connect  
       // this fires an event connection on a server     
        //this.socket=io.connect('http://localhost:5000');

        this.socket=io.connect('http://34.227.91.113:5000');

        if(this.userEmail){

            this.connectionHandler();
        }
    }

    connectionHandler(){

        // on is javascript event which is detecting an event that connection is establish with server
        // server will send and acknowledgement when connection is established

        let self=this;
        this.socket.on('connect',function(){
            console.log('connection established using sockets');

            // this will emit a event and received on a chat socket file on a server side
            // this will send a info. which user to join ,that user email and chatromm codial
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'codial'
            });
            self.socket.on('user_joined',function(data){
                console.log('a user joined ',data);
            });
        });
        // send a message on clicking a message button
        $('#send-message').click(function(){

            let msg=$('#chat-message-input').val();

            if(msg !=''){

                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'codial'
                });
            }
        });
        self.socket.on('receive_message',function(data){

            console.log('message received',data.message);

            let newMessage=$('<li>');
           // console.log(newMessage);
            let messageType='other-message';
            if(data.user_email == self.userEmail)
            {
                messageType='self-message'
            }
            newMessage.append($('<span>',{
                'html':data.message
            }));
            newMessage.append($('<sub>',{
                'html':data.user_email
            }));
            newMessage.addClass(messageType);
            console.log(newMessage[0]);
            $('.chat-message-list').append(newMessage);


        });

    }
}
