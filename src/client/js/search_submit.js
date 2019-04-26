function search(place) {
  var business = document.getElementById("business_autocomplete").value;
  var location = document.getElementById("autocomplete").value;

  if (business == "" && location == "")
    document.getElementById("par").innerHTML = "Please provide some input!!!!";
  else if (business == "") {
    document.getElementById("par").innerHTML = "Please select a Business!!!";
  } else if (location == "") {
    document.getElementById("par").innerHTML = "";
    var biz_info = business.split(",");
    var biz_name = biz_info[0].trim();
    var biz_city = biz_info[1].trim();
    var biz_state = biz_info[2].trim();
    //var biz_id = biz_info[3].split(": ")[1];
    var biz_id_list, biz_id;
    var myVariable;
    $.ajax({
      async: false,
      type: "GET",
      global: false,
      url:
        "http://localhost:4000/getbusinessesbynamecitystate/" +
        biz_name +
        "/" +
        biz_city +
        "/" +
        biz_state,
      success: function(data) {
        biz_id_list = data;
      }
    });
    biz_id = biz_id_list[0].business_id;
    $.ajax({
      async: false,
      type: "GET",
      global: false,
      url: "http://localhost:4000/getbusinessbyID/" + biz_id,
      success: function(data) {
        myVariable = data;
      }
    });
    plot_business(myVariable);
  } else {
    document.getElementById("par").innerHTML = "";
    var biz_info = business.split(",");
    var biz_name = biz_info[0].trim();
    var biz_city = biz_info[1].trim();
    var biz_state = biz_info[2].trim();
    var biz_id = biz_info[3].split(": ")[1];

    var location = document.getElementById("autocomplete").value;
    var loc_info = location.split(",");
    var loc_city = loc_info[0].trim();
    var loc_state = loc_info[1].trim();

    if (biz_city != loc_city) {
      document.getElementById("par").innerHTML =
        "Business not found in the given location";
    } else {
      document.getElementById("par").innerHTML = "";
      var biz_info = business.split(",");
      var biz_name = biz_info[0].trim();
      var biz_city = biz_info[1].trim();
      var biz_state = biz_info[2].trim();
      //var biz_id = biz_info[3].split(": ")[1];
      var biz_id_list, biz_id;
      var myVariable;
      $.ajax({
        async: false,
        type: "GET",
        global: false,
        url:
          "http://localhost:4000/getbusinessesbynamecitystate/" +
          biz_name +
          "/" +
          biz_city +
          "/" +
          biz_state,
        success: function(data) {
          biz_id_list = data;
        }
      });
      biz_id = biz_id_list[0].business_id;
      $.ajax({
        async: false,
        type: "GET",
        global: false,
        url: "http://localhost:4000/getbusinessbyID/" + biz_id,
        success: function(data) {
          myVariable = data;
        }
      });
      plot_business(myVariable);
    }
  }
}
