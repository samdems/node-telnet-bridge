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