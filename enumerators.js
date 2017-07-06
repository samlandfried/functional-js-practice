var each = function(array, callback) {
  for ( var i = 0; i < array.length; i ++ ) {
    callback(array[i]);
  };
  return array;
};

var map = function(array, callback) {
  var newArr = [];

  for ( var i = 0; i < array.length; i ++ ) {
    newArr.push(callback(array[i]));
  }

  return newArr;
}

module.exports = { each, map };
