ticklist = [];
setInterval(function(){
  for (var i = 0; i < ticklist.length; i++) {
   ticklist[i].tick();
  }
}, 1000);