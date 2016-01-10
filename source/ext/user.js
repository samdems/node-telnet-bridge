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
    telnet.write(data);
    this.active(data);
  };
};