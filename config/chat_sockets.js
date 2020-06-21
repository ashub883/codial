module.exports.chatSockets=function(socketServer){
    let io=require('socket.io')(socketServer);

    io.sockets.on('connection',function(socket){
        // this event will send an acknowledge by emitting a connect event to req(front end)
        console.log('new connection received ',socket.id);
        socket.on('disconnect',function(){

            console.log('socket disconnected')
        })
        // 'on' detects an event send by the client(the event emitted)
        socket.on('join_room',function(data){

            console.log('joining request',data);

            // this will enter a user in a chatroom 
            //and if a chatroom  doesn't exist then it create a chatroom and enter a user into it 
            socket.join(data.chatroom);
            
            // when user enters a chatroom it gives a notification to other users 
            // ..present in a chatroom  and to a user who entered a chatroom
            // so for this we have to emit a event inside a room(inside a this room) 
            // tell the whole room users that a user enter a room
            // when we want to emit a event in a specific chatroom we use io.in(data.chatroom)
           io.in(data.chatroom).emit('user_joined',data)   
        })
        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        })
    })
}