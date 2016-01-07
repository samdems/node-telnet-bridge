
var telnet = require('telnet');
var Buffers = require('buffers');
var Buffers = require('colors');
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

User = function(telnet) {
  this.width  = 0;
  this.height = 0;
  this.setwindowsize = function(width,height) {
   this.width  = width;
   this.height = height;
  };
  this.clear = function() {
    telnet.write("'\u001B[2J\u001B[0;0f'");
  };
  this.center = function(b) {
    for (var i = 0; i < Math.floor((this.width/2)-(b.length/2)); i++) {
      telnet.write(new Buffer([27,91,67]));
    }
     telnet.write(b + "\n");
  };
  this.received = function(data) {     
    //telnet.write(data);
    this.active(data);
  };
};

Menu = function(user,telnet,title,options) {
  var selected = 0;
  this.render = function() {
    user.center(title.white);
    telnet.write("\u001B[2J\u001B[0;0f".white);
    var count = 0;
    for (var key in options){
      if (count == selected ) {
        user.center(key.red);
      }else{
        user.center(key.white);
      }
      count++;
    }
  };
  this.render();
  var render = this.render;
  this.receive = function(data) {
    if (data[0] == 27 && data[1] == 91 && data[2] == 66) {
      selected++;
      render();
    }else if (data[0] == 27 && data[1] == 91 && data[2] == 65) {
      selected--;
      render();
    }else if (data[0] == 27 && data[1] == 91 && data[2] == 67) {
      var count = 0;
      for (var key in options){
        if (count == selected ) {

          options[key](user,telnet,this);
        }
        count++;
      }
    }
    if (selected < 0) {
      selected = 0;
    }
    if(selected < options.length ){
      selected = 0;
    }
  };
};
screengui = function(user,telnet,title,data,menu) {
  var loop;
  this.render = function() {
    loop = setInterval(function(){
        user.clear();
        telnet.write(data);       
      }, 500);
  };
  this.receive = function(data) {
    clearInterval(loop);
    var test = menu.receive;
    user.active = test;
    //menu.render();
  };
};
ticklist = [];
Universe = function() {
  ticklist.push(this);
  this.ships = [];
  this.addShip = function(ship) {
    this.ships.push(ship);
  };
  this.tick = function() {};
};
Ship = function(name) {
  ticklist.push(this);
  this.rooms = [];
  this.addRoom = function(newRoom,x,y) {
    this.rooms.push({room: newRoom,x:x,y:y});
    newRoom.setShip(this);
  };
  this.listrooms = function() {
    var output = [];
    for (var i = 0; i < this.rooms.length; i++) {
     output.push (this.rooms[i].room);
    }
    return output;
  };
  this.getAdjacentRooms = function(room) {
    AdjacentRooms = [];
    for (var i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].room === room) {
        for (var x = 0; x < this.rooms.length; x++) {
          if (this.rooms[i].x + 1 == this.rooms[x].x || this.rooms[i].x - 1 == this.rooms[x].x || this.rooms[i].y - 1 == this.rooms[x].y || this.rooms[i].y + 1 == this.rooms[x].y  ) {
            AdjacentRooms.push(this.rooms[x].room);
          }
        }
      }
    }
    return AdjacentRooms;
  };
  this.tick = function() {};
  this.stats = function() {
    output  = "___-___-___-___" + name + "___-___-___-___\n";
    for (var i = 0; i < this.rooms.length; i++) {
      output += " x: " + this.rooms[i].x + " y:" + this.rooms[i].y;
      output += this.rooms[i].room.stats();
    }
    return output;
  };
};
Room = function(name,transferRate) {
  ticklist.push(this);
  this.resources = [];
  this.requireResources = {};
  this.online = true;
  this.ship = null;
  this.setShip = function(ship) {
    this.ship = ship;
  };
  this.addResource = function(newResource) {
    this.resources.push(newResource);
  };
  this.getName = function() {
    return name;
  };
  this.getResource = function(name) {
      for (var i = 0; i < this.resources.length; i++) {
        if (this.resources[i].getName() == name)
        {
          return this.resources[i];
        }
      }
     return false;
  };
  this.tick = function() {
    
      for (var key in this.requireResources) {
        if (this.getResource(key) === false || this.getResource(key).getAmount() === 0) {
          this.online = false;
        }else{
          this.getResource(key).addAmount(-this.requireResources[key]);
          this.online = true;
        }
        if (this.online) {
          if (this.getResource(key).getRecommended() - this.getResource(key).getAmount() < 0) {
           var arooms = this.ship.getAdjacentRooms(this);
           for (var i = 0; i < arooms.length; i++) {
            if (arooms[i].getResource(key)) {
             if (arooms[i].getResource(key).getRecommended() - arooms[i].getResource(key).getAmount() > 0) {
                 var aamount = this.getResource(key).addAmount(transferRate*-1)*-1;
                 var test = arooms[i].getResource(key).addAmount(aamount);
                  if (test !== aamount ) {
                    this.getResource(key).addAmount(aamount-test);
                  }
             }
            }
           }
          }
        }
    }
  };
  this.stats = function() {
   output  = "__" + name + "__\n"+ this.online + "\ntype | name | amount  | max  |  gen  |  recommended\n";
   for (var i = 0; i < this.resources.length; i++) {
     output += this.resources[i].stats() + "\n";
   }
   return output;
  };

};
Resource = function(type,name,amount,max,recommended,gen) {
  ticklist.push(this);
  this.getAmount = function() {
    return amount;
  };
  this.getName = function() {
    return name;
  };
  this.getType = function() {
      return type;
  };
  this.getMax = function() {
    return max;
  };
  this.getRecommended = function() {
    return recommended;
  };
  this.addAmount = function(newamount) { 
    if (amount + newamount >= 0 && amount + newamount < max+1) {
       amount += newamount;
       return newamount ;
    }
    if (amount + newamount > max ) {
      amount += newamount - (amount + newamount - max);
      return (amount + newamount - max);
    }
    return 0;
  };
  this.tick = function() {
    if (gen !== null) {
      this.addAmount(gen);
    }
  };
  this.stats = function() {
     return type +"|"+ name +"|"+ amount +"|"+ max +"|"+ gen +"|"+ recommended;
  };
};
Person = function(name,size,requireResources) {
  ticklist.push(this);
  this.requireResources = {};
  this.room;
  this.living = true;
  this.getsize = function() {
    return size;
  };
  this.kill = function() {
    this.living = false;
    this.tick = function() {};
  };
  this.moveroom = function(room) {
    this.room = room;
  };
  this.tick = function() {
    for (var key in this.requireResources) {
      if (this.room.getResource(key) === false || this.room.getResource(key).getAmount() === 0) {
        this.kill();
      }else{
      if (this.requireResources[key] !== null) {
         this.room.getResource(key).addAmount(-this.requireResources[key]);
        }
      }
    }
  };
  this.stats = function() {
     output = "__" + name + "__\n";
      if (this.living) {
        output += "is living";
      }else{
        output += "is dead";
      }
     return output;
  };
};


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
setInterval(function(){
  for (var i = 0; i < ticklist.length; i++) {
   ticklist[i].tick();
  }
  //document.body.innerHTML = ship.stats().replace(/(?:\r\n|\r|\n)/g, '<br />');
  //console.log (ship.stats());
  //console.log (sam.stats());
  //console.log (mick.stats());
  
}, 1000);   


//telnet.write(Array(Math.floor((this.width/2)-(b.length/2))).join(" ") + b);
//
//
//
String.prototype.repeat= function(n){
    n = n || 1;
    return Array(n+1).join(this);
}