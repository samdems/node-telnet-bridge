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