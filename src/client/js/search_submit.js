function search()
{
	var business = document.getElementById("business_autocomplete").value;
	var location = document.getElementById("autocomplete").value;

	if(business == "" && location == "")
		document.getElementById("par").innerHTML = "Please provide some input!!!!"
	
	else if(business == "")
	{
		document.getElementById("par").innerHTML = ""
		autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')));
		//google.maps.event.addListener(autocomplete, 'place_changed', function(){
        //	place = autocomplete.getPlace();
        //	console.log(place)
      	//})

		/*autocomplete.addListener('place_changed', function() {
        	place = autocomplete.getPlace();
        	console.log(place)
          	if (!place.geometry) {
           		document.getElementById("par").innerHTML = "No details available for input: " + place.name;
            	return;
          	}
          	//plot_business_by_location(autocomplete.value)
      	});
      	//console.log(place)
		//plot_business_by_location(place);*/
	}
	else
	{
		document.getElementById("par").innerHTML = "";
		var biz_info = business.split(',')
		var biz_name = biz_info[0]
		var biz_city = biz_info[1]
		var biz_state = biz_info[2]
		var biz_id = biz_info[3].split(': ')[1]
		var myVariable;
		$.ajax({'async': false,'type': "GET",'global': false,'url': "http://localhost:4000/getbusinessbyID/"+biz_id,'success': function (data) {myVariable = data;}});
		plot_business(myVariable)

	}
}