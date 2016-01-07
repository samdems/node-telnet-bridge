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
  this.load = function(file,callback) {
    fs.readFile(file, function (err, data) {
      if (err) {
        throw err; 
      }
      data = JSON.parser(data);
      name = data.name;
      console.log(data);
      return callback;
    });
   
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