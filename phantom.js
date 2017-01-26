var page = require('webpage').create();
page.onConsoleMessage = function(msg) {
  console.log(msg);
};
page.open('http://kurs.com.ua/', function(status) {
  var courses = page.evaluate(function() {
  	var cur = {};
  	cur.buy = +document.body.querySelector('table.currency tbody tr:first-child td:nth-child(2) span').innerHTML;
  	cur.sale = +document.body.querySelector('table.currency tbody tr:first-child td:nth-child(3) span').innerHTML;
   	cur.nbu = +document.body.querySelector('table.currency tbody tr:first-child td:nth-child(5) span').innerText;
   
    return cur;    
  });
  if(courses){
  	console.log(JSON.stringify(courses));
  } else {
  	console.log('');
  }  
  phantom.exit();
});




