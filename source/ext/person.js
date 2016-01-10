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