Universe = function() {
  ticklist.push(this);
  this.ships = [];
  this.addShip = function(ship) {
    this.ships.push(ship);
  };
  this.tick = function() {};
};