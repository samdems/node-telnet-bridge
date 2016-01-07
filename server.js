include = function(file) {
  var data = fs.readFileSync(file);
  eval(data.toString());
};


var telnet  = require('telnet');
var Buffers = require('buffers');
var colors  = require('colors');
var fs = require("fs");

include("ext/tick.js");
include("ext/user.js");
include("ext/menu.js");
include("ext/universe.js");
include("ext/screengui.js");
include("ext/ship.js");
include("ext/room.js");
include("ext/Resource.js");
include("ext/person.js");


var strVar="";
strVar += "      ╔══════╗                     ╔══════╗\n".red;
strVar += "      ║      ║       ╔╧■■■╧╗       ║      ║\n".red;
strVar += "      ║      ║  ╔════╩═■■■═╩════╗  ║      ║\n".red;
strVar += "      ║      ║  ║               ║  ║      ║\n".red;
strVar += "      ║      ╟──╢               ╟──╢      ║\n".red;
strVar += "      ║      █  █               █  █      ║\n".red;
strVar += "      ║      ╟──╢               ╟──╢      ║\n".red;
strVar += "      ║      ║  ║               ║  ║      ║\n".red;
strVar += "      ╚══════╝  ╚═════╤■■■╤═════╝  ╚══════╝\n".red;
strVar += "             ╔═══════╗│   │╔═══════╗\n";
strVar += "             ║       ╟┘   └╢       ║\n";
strVar += "             ║       █     █       ║\n";
strVar += "             ║       ╟┐   ┌╢       ║\n";
strVar += "             ║       ║│   │║       ║\n";
strVar += "             ╚═══════╝│   │╚═══════╝\n";
strVar += "                ╔═════╧■■■╧═════╗\n";
strVar += "                ║               ║\n";
strVar += "                ║               ║\n";
strVar += "                ║               ║\n";
strVar += "                ╚═════╤■■■╤═════╝\n";
strVar += "                  ╔═══╧■■■╧═══╗\n".green;
strVar += "                  ║           ║\n".green;
strVar += "                  ║           ║\n".green;
strVar += "                  ╚╗         ╔╝\n".green;
strVar += "                   ║         ║\n".green;
strVar += "                   ╚═════════╝\n".green;


// up = 27,91,65
// down = 27,91,66
// right = 27,91,67
// left = 27,91,68
// retrun = 13,10 
// control c = 3  
// excape = 27  

list = {
  ship_layout:function(user,telnet,menu) {
    console.log("shipstats");
    gui = new screengui(user,telnet,"shipstats",strVar,menu);
    user.active = gui.receive;
    gui.render();
  },
  ship_stats:function(user,telnet) {
    console.log("shipstats");
    gui = new screengui(user,telnet,"shipstats",ship.stats(),menu);
    user.active = gui.receive;
    gui.render();
  }
};

telnet.createServer(function (client) {
  //client.setRawMode = setRawMode
  client.do.transmit_binary();
  client.do.window_size();
  user = new User(client);
  client.on('window size', function (e) {
    if (e.command === 'sb') {
      user.setwindowsize(e.width, e.height);
       menu = new Menu(user,client,"main menu",list);
       user.active = menu.receive;
    }
  });
  client.on('data', function (data) {
   user.received(data);  
  });

}).listen(8080);

/*

bridge = new Room("bridge",10);//type,name,amount,max,recommended,gen
bridge.addResource(new Resource("gas","air",100,100,50));
bridge.addResource(new Resource("power","power",50,50,50));
bridge.addResource(new Resource("space","space",2,2));
bridge.requireResources.power = 20;
bridge.requireResources.air = 10;

lab = new Room("lab",10); //type,name,amount,max,recommended,gen
lab.addResource(new Resource("gas","air",100,100,50));
lab.addResource(new Resource("power","power",50,50,50));
lab.addResource(new Resource("space","space",2,2));
lab.requireResources.power = 10;
lab.requireResources.air = 10;

bed = new Room("bed",10); //type,name,amount,max,recommended,gen
bed.addResource(new Resource("gas","air",100,100,50));
bed.addResource(new Resource("power","power",50,50,50));
bed.addResource(new Resource("space","space",2,2));
bed.requireResources.power = 10;
bed.requireResources.air = 10;

o2 = new Room("o2",15);//type,name,amount,max,recommended,gen
o2.addResource(new Resource("gas","air",100,1000,10,20));
o2.addResource(new Resource("power","power",50,500,100));
o2.addResource(new Resource("space","space",1,1));
o2.requireResources.power = 100;
o2.requireResources.air = 10;

sublight1 = new Room("sublight engine1",20); //type,name,amount,max,recommended,gen
sublight1.addResource(new Resource("power","power",100,1000,50,100));
sublight1.requireResources.power = 20;

sublight2 = new Room("sublight engine2",20); //type,name,amount,max,recommended,gen
sublight2.addResource(new Resource("power","power",1500,1000,50,100));
sublight2.requireResources.power = 20;

ship = new Ship("ship-002");
ship.addRoom(bridge,0,0);
ship.addRoom(o2,1,0);
ship.addRoom(lab,1,1);
ship.addRoom(bed,1,1);
ship.addRoom(sublight1,2,0);
ship.addRoom(sublight2,2,1);

//ship-002
//┌──┐┌──┐┌──┐
//│br││o2││eg│
//└──┘└──┘└──┘
//┌──┐┌──┐┌──┐
//│la││sl││eg│ 
//└──┘└──┘└──┘



sam = new Person("sam",1);
sam.moveroom(bridge);
sam.requireResources.air = 1;
sam.requireResources.power = 7;

mick = new Person("mick",1);
mick.moveroom(bridge);
mick.requireResources.air = 1;
sam.requireResources.power = 7;


universe = new Universe();
universe.addShip(ship);

*/

String.prototype.repeat= function(n){
    n = n || 1;
    return Array(n+1).join(this);
};





