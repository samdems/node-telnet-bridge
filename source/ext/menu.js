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