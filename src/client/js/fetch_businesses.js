 /* var business_names = [];
  const url = "http://localhost:4000/businesses";
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'text';
  fetch(url).then(function(response) {
   response.text().then(function(text) {
      var text2 = JSON.parse(text)
      business_names = text2.map(e => e.name)
    });

   called()
 });


function called()
{
  console.log("hello")
  console.log(business_names)
}

var url = "http://localhost:4000/businesses";
var request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'text';
request.send();

var business_names = [];
var myFetch = fetch(url);
myFetch.then(function(response) {
  response.text().then(function(text) {
    business_names = text;
  });
});
console.log(business_names);


const business_names = $.get("http://localhost:4000/businesses",function(data){
    console.log(data)
    var temp = JSON.parse(data.responseJson)
    console.log(temp)
    return data;
  });

//console.log(business_names)
*/

var myVariable;
var business_names = []
$.ajax({'async': false,'type': "GET",'global': false,'url': "http://localhost:4000/getbusinesses",'success': function (data) {myVariable = data;}});

for(row in myVariable){
  business_names.push(myVariable[row].name)
}
console.log(business_names)
