const express = require('express');
const path = require('path');
const app = express();
const socket = require('socket.io');
// settings
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
// listen the server
const server = app.listen(app.get('port'), () => {
  console.log('Listening on port', app.get('port'));
});

//socket
const io = socket(server);

let user_data = [
				{name:"luis"},
				{name:"Juan"},
				{name:"Edd"}
					];

	//iniiar coneccion a socket
	io.on('connection', (socket) => {
	  
		console.log('socket connection opened:', socket.id);
			
		io.emit("send","Hellow Word");
		

		//informacion
		if(user_data.length>0){
			
			io.emit("send-user-data",user_data);
			
		}

		//detectar desconeccion
		socket.on('disconnect',() => {
				console.log("disconnect ",socket.id)	
		  });
	  
	});

  
	let user = io.of("/users");
	
	user.on("connection", (socket) => {

		  console.log("Connect to the NameSpace user");
		  
		  user.emit("sendNameSpace","Connect to NameSpace User")
			
		    socket.on("add_Data",(data)=>{
				
					
				console.log("nuevo user",data.name);

				
				// user_data.forEach((element,index)=>{
						
				for(let i=0; i<user_data.length; i++){
						
						console.log("user registrados",user_data[i].name);
						// console.log(A+"|",user_data.length);
						
							
							if(user_data[i].name==data.name){
								
								
								console.log(">>Ya "+user_data[i].name+" registrado");

								break;
								
							}

							if(user_data[i].name!=data.name){
								
								    console.log(i,user_data.length-1);
								
									if(i==(user_data.length-1)){
										
										console.log("todos leidos")
										console.log("NO registrado "+data.name+" Cargando....");
										
										user_data.push(data);
										io.emit("send-user-data",user_data);
										break;
									}
									
							}
								
					}			
					
				});
				
				
				
				// user.emit("send_data","DUno");
	
			
			socket.on("Delete_Data",(data)=>{
				
			
				
				user_data.forEach((element,index)=>{
					
					
					if(data == element.name){
						
						console.log("conseguido la pos es",index);
						user_data.splice(index,1);
						io.emit("send-user-data",user_data);
						
						
					}else{
						
						console.log("No es");
						
					}
					
					
				})
				
				
				
			})
			
		    socket.on('disconnect', function(){
				// user.emit("chat message", name+": disconnection");
			});
					
	});


	


// https://gist.github.com/companje/0a42eb25dd3caff92ab7
// https://socket.io/docs/v4/namespaces/



// informacion
// https://socket.io/docs/v4/namespaces/
// /historial de eventos

//funcion de escucha constante
// socket.on ( "detalles" , ( ... args ) => { // ... });

//funcion de escucha una sola ves
// socket.once ( "detalles" , ( ... args ) => { // ... });

// elimina el oyente de la matris de oyentes
// socket.off ( "detalles" , oyente);

// elimina todos los oyentes o los del eventName especificado .
	// para un evento específico
	 // socket.removeAllListeners ( "detalles" ); 
	// para todos los eventos
	 // socket.removeAllListeners ();

// Agrega un oyente que se activará cuando se emita cualquier evento
	// socket.onAny ( ( eventName, ... args ) => { // ... });
  
 // Agrega un oyente que se activará cuando se emita cualquier evento.
  // El oyente se agrega al comienzo de la matriz de oyentes
	// socket.prependAny ( ( eventName, ... args ) => { // ... });
 
 // Elimina todos los oyentes catch-all, o el oyente dado. 
// const listener = ( eventName, ... args ) => { console .log (eventName, args); }
 

// socket.onAny (oyente);

// // y luego ...
 // socket.offAny (oyente);

// // o todos los oyentes
// Transmitir a clientlocal
  // io.local.emit ( "hola" , "mundo" );
  
  // enviar a todos menos al que emite
  // socket.broadcast.emit('chat:typing', data);