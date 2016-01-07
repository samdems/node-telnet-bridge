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