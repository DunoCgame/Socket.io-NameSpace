let username = document.getElementById('username');
let btnAdd = document.getElementById('send');
let btnDelete = document.getElementById('delete');
let output = document.getElementById('output');

// conenction
let socket = io();

// client-side socket.io 
socket.on("connect",()=>{
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  // console.log("connect",socket.connected); // true
});

//datos
socket.on("send",(arg)=>{	
	console.log(arg);	
});

socket.on("send-user-data",(data)=>{	
	// console.log(data);
	output.innerHTML = '';
		data.forEach((element,index)=>{		
			
			output.innerHTML += 
			  `<p>
				 ${element.name}
			  </p>`
		});
});

socket.on("connect_error",()=>{
	  setTimeout(() => {
			socket.connect();
	  }, 1000);
});

socket.on("disconnect", () => {
	console.log(socket.id); // undefined
	// console.log("connect",socket.connected);  // true
});



//socket-io NameSpace
let users = io.connect("/users");

	users.on("sendNameSpace",(arg)=>{
		console.log(arg)

	});	
	
	users.on("send-data",(arg)=>{
		console.log("send-data",arg)

	});
	
	//eventos dom
		btnAdd.addEventListener('click', function() {
			
			let name=username.value;
			
			console.log(name);
			
			  users.emit('add_Data',{
					name:name
			  }); 
			  
			  users.emit('usernamespace',"sms de namesapxce user");
			  
			  username.value="";
		});	

		btnDelete.addEventListener('click', function(){
			
			let name = username.value;
			
			console.log(name);
			
			  users.emit('Delete_Data',name); 			  
			  
			  
		});